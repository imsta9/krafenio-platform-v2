import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/auth";
import { hashToken } from "@/lib/security";
export async function POST() {
 const jar=await cookies(); const token=jar.get(SESSION_COOKIE)?.value;
 if(token) await db.session.deleteMany({where:{tokenHash:hashToken(token)}});
 const res=NextResponse.json({success:true}); res.cookies.delete(SESSION_COOKIE); return res;
}
