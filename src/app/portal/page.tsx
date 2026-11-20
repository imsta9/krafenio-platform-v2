import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function ClientPortal() {
  const user = await requireRole(["CLIENT"]);
  const memberships = await db.clientMember.findMany({
    where: { userId: user.id },
    include: { client: { include: { projects: { include: { _count: { select: { tasks: true } } } } } } }
  });
  return <main className="workspace-content">
    <div className="eyebrow">CLIENT PORTAL</div><h1>Your projects</h1>
    <p className="muted">Project visibility for your organization.</p>
    <div className="grid-3">{memberships.flatMap(m=>m.client.projects.map(p=><article className="card" key={p.id}><h3>{p.name}</h3><p>{p.code} · {p.status}</p><p>{p._count.tasks} tasks</p></article>))}</div>
    {memberships.length===0&&<p className="muted">No client workspace has been assigned to this account yet.</p>}
  </main>;
}
