import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.job.findMany({include:{_count:{select:{applications:true}}},take:50,orderBy:{createdAt:"desc"}}) as unknown as Array<{id:string;title:string;location:string;status:string;_count:{applications:number}}>;
  return <><div className="eyebrow">WORKSPACE / JOB OPENINGS</div><h1>Job openings</h1><p className="muted">Manage public job opportunities.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Position</th><th>Location</th><th>Status</th><th>Applications</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.title}</td><td>{row.location}</td><td>{row.status}</td><td>{row._count.applications}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
