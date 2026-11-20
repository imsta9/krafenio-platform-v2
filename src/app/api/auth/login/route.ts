import { NextRequest,NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSessionToken,hashToken } from "@/lib/security";
import { SESSION_COOKIE } from "@/lib/auth";
const schema=z.object({email:z.string().email().max(254),password:z.string().min(1).max(200)});
export async function POST(req:NextRequest) {
 const parsed=schema.safeParse(await req.json().catch(()=>null));
 if(!parsed.success) return NextResponse.json({message:"Enter a valid email and password."},{status:400});
 const user=await db.user.findUnique({where:{email:parsed.data.email.toLowerCase()},include:{roles:true}});
 if(!user || user.status!=="ACTIVE" || !(await compare(parsed.data.password,user.passwordHash))) return NextResponse.json({message:"Email or password is incorrect."},{status:401});
 const token=createSessionToken();
 await db.session.create({data:{tokenHash:hashToken(token),userId:user.id,expiresAt:new Date(Date.now()+7*24*60*60*1000)}});
 const res=NextResponse.json({success:true,user:{name:user.name,email:user.email,roles:user.roles.map(r=>r.role)}});
 res.cookies.set(SESSION_COOKIE,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:7*24*60*60});
 return res;
}
