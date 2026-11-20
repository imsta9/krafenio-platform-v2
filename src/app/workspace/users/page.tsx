import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.user.findMany({include:{roles:true},take:50,orderBy:{createdAt:"desc"}}) as unknown as Array<{id:string;name:string;email:string;roles:{role:string}[];status:string}>;
  return <><div className="eyebrow">WORKSPACE / USERS & ACCESS</div><h1>Users & access</h1><p className="muted">Review registered platform users and their access.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Name</th><th>Email</th><th>Roles</th><th>Status</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.name}</td><td>{row.email}</td><td>{row.roles.map(role=>role.role).join(", ")}</td><td>{row.status}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
