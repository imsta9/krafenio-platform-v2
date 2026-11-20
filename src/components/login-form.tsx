"use client";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
export function LoginForm(){const router=useRouter();const [error,setError]=useState("");const [busy,setBusy]=useState(false);
async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setBusy(true);setError("");const d=new FormData(e.currentTarget);try{const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:d.get("email"),password:d.get("password")})});const j=await r.json();if(!r.ok)throw new Error(j.message);router.push("/workspace");router.refresh()}catch(x){setError(x instanceof Error?x.message:"Unable to sign in")}finally{setBusy(false)}}
return <form className="form" onSubmit={submit}><label className="field">Email<input name="email" type="email" required autoComplete="username"/></label><label className="field">Password<input name="password" type="password" required autoComplete="current-password"/></label>{error&&<p style={{color:"#fca5a5"}}>{error}</p>}<button className="btn" disabled={busy}>{busy?"Signing in…":"Sign in"}</button></form>}
