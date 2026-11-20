import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.department.findMany({include:{_count:{select:{employees:true,teams:true}}},take:50,orderBy:{name:"asc"}}) as unknown as Array<{id:string;name:string;_count:{employees:number;teams:number}}>;
  return <><div className="eyebrow">WORKSPACE / DEPARTMENTS</div><h1>Departments</h1><p className="muted">Organize the company by department.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Department</th><th>Employees</th><th>Teams</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.name}</td><td>{row._count.employees}</td><td>{row._count.teams}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
