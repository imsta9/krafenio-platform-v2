import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
const schema=z.object({name:z.string().trim().min(2).max(120),email:z.string().email().max(254),company:z.string().trim().max(160).optional(),subject:z.string().trim().min(3).max(180),message:z.string().trim().min(10).max(5000)});
export async function POST(req:NextRequest) {
 const parsed=schema.safeParse(await req.json().catch(()=>null));
 if(!parsed.success) return NextResponse.json({message:"Please check the form fields."},{status:400});
 await db.inquiry.create({data:parsed.data});
 return NextResponse.json({success:true},{status:201});
}
