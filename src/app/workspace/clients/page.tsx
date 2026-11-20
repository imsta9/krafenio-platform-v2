import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.client.findMany({include:{_count:{select:{projects:true}}},take:50,orderBy:{createdAt:"desc"}}) as unknown as Array<{id:string;name:string;companyName:string|null;industry:string|null;_count:{projects:number}}>;
  return <><div className="eyebrow">WORKSPACE / CLIENTS</div><h1>Clients</h1><p className="muted">Manage client organizations and relationships.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Client</th><th>Company</th><th>Industry</th><th>Projects</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.name}</td><td>{row.companyName ?? "—"}</td><td>{row.industry ?? "—"}</td><td>{row._count.projects}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
