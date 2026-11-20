import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { hashToken } from "@/lib/security";
export const SESSION_COOKIE = "krafenio_session";
export async function getCurrentUser() {
 const token = (await cookies()).get(SESSION_COOKIE)?.value;
 if (!token) return null;
 const session = await db.session.findUnique({where:{tokenHash:hashToken(token)},include:{user:{include:{roles:true,employee:true}}}});
 if (!session || session.expiresAt <= new Date() || session.user.status !== "ACTIVE") return null;
 return {id:session.user.id,name:session.user.name,email:session.user.email,roles:session.user.roles.map(r=>r.role),employee:session.user.employee};
}
export async function requireUser() { const user=await getCurrentUser(); if(!user) redirect("/login"); return user; }
export async function requireRole(roles:string[]) { const user=await requireUser(); if(!user.roles.includes("SUPER_ADMIN") && !user.roles.some(r=>roles.includes(r))) redirect("/unauthorized"); return user; }

