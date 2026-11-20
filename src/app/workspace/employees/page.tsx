import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.employee.findMany({include:{user:true,department:true,team:true},take:50,orderBy:{createdAt:"desc"}}) as unknown as Array<{id:string;user:{name:string;email:string};title:string;department:{name:string}|null;team:{name:string}|null}>;
  return <><div className="eyebrow">WORKSPACE / EMPLOYEES</div><h1>Employees</h1><p className="muted">Manage employee profiles, departments, and team membership.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Employee</th><th>Title</th><th>Department</th><th>Email</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.user.name}</td><td>{row.title}</td><td>{row.department?.name ?? "—"}</td><td>{row.user.email}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
