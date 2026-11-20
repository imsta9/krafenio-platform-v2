import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.task.findMany({include:{project:true,assignee:{include:{user:true}}},take:50,orderBy:{createdAt:"desc"}}) as unknown as Array<{id:string;title:string;project:{name:string};assignee:{user:{name:string}}|null;status:string;priority:string}>;
  return <><div className="eyebrow">WORKSPACE / TASKS</div><h1>Tasks</h1><p className="muted">Coordinate assignments and delivery progress.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Task</th><th>Project</th><th>Assignee</th><th>Status</th><th>Priority</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.title}</td><td>{row.project.name}</td><td>{row.assignee?.user.name ?? "Unassigned"}</td><td>{row.status}</td><td>{row.priority}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
