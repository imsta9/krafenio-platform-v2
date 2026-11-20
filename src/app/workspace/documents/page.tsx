import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Page() {
  await requireRole(["SUPER_ADMIN","ADMIN","HR_MANAGER","PROJECT_MANAGER","TEAM_LEAD"]);
  const rows = await db.document.findMany({include:{uploadedBy:true,project:true},take:50,orderBy:{createdAt:"desc"}}) as unknown as Array<{id:string;originalName:string;project:{name:string}|null;uploadedBy:{name:string};visibility:string}>;
  return <><div className="eyebrow">WORKSPACE / DOCUMENTS</div><h1>Documents</h1><p className="muted">Review document records and project associations.</p>
    <section className="panel" style={{marginTop:24,overflowX:"auto"}}>
      <table className="table"><thead><tr><th>Document</th><th>Project</th><th>Uploaded by</th><th>Visibility</th><th>Record ID</th></tr></thead>
      <tbody>{rows.map(row=><tr key={row.id}><td>{row.originalName}</td><td>{row.project?.name ?? "Company"}</td><td>{row.uploadedBy.name}</td><td>{row.visibility}</td><td><code>{row.id.slice(0,10)}</code></td></tr>)}</tbody></table>
      {rows.length===0&&<p className="muted">No records found yet.</p>}
    </section>
  </>;
}
