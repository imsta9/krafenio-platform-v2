import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.project.findMany({include:{client:true},take:50,orderBy:{createdAt:"desc"}}) as unknown as Array<{id:string;name:string;code:string;client:{name:string};status:string;health:string}>;
  return <><div className="eyebrow">WORKSPACE / PROJECTS</div><h1>Projects</h1><p className="muted">Track client delivery, project status, and health.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Project</th><th>Code</th><th>Client</th><th>Status</th><th>Health</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.name}</td><td>{row.code}</td><td>{row.client.name}</td><td>{row.status}</td><td>{row.health}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
