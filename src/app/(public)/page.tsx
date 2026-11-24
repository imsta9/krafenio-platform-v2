import Link from "next/link";
import Image from "next/image";
import {Code2,Sparkles,Cloud,Database,ShieldCheck,Workflow,ArrowUpRight} from "lucide-react";
const caps=[["Software Engineering","Purpose-built web, mobile, and enterprise applications.",Code2],["AI & Automation","Intelligent workflows and applied AI.",Sparkles],["Cloud & DevOps","Cloud foundations and reliable delivery.",Cloud],["Data Engineering","Pipelines, integration, and analytics.",Database],["Quality Engineering","Test strategy and engineering discipline.",ShieldCheck],["Enterprise Integration","Secure APIs and connected systems.",Workflow]] as const;
export default function Home(){return <><section className="hero"><div className="container hero-grid"><div><div className="eyebrow">GLOBAL SOFTWARE ENGINEERING Â· FOUNDED 2020</div><h1>Engineering<br/><span className="accent">Without Borders.</span></h1><p className="lead">We bring passionate minds together to engineer exceptional digital experiences, intelligent systems, and technology solutions for businesses around the world.</p><div className="hero-actions"><Link className="btn" href="/contact">Start a project <ArrowUpRight size={15}/></Link><Link className="btn secondary" href="/careers">Explore careers</Link></div><p className="muted" style={{marginTop:24}}>One connected engineering community. Built for global collaboration and meaningful work.</p></div>

<div className="hero-art">
  <Image
    src="/brand/krafenio-logo.png"
    alt="KRAFENIO Global Engineering Platform"
    width={600}
    height={200}
    priority
    style={{
      width: "100%",
      maxWidth: 520,
      height: "auto",
      mixBlendMode: "screen",
    }}
  />
</div>

</div></section><section className="section"><div className="container"><div className="eyebrow">A GLOBAL ENGINEERING MINDSET</div><h2>Technology moves fast.<br/><span className="accent">Purpose keeps us focused.</span></h2><p className="muted">Founded in 2020, KRAFENIO brings together an international, remote-first engineering organization.</p><div className="stats"><div className="stat"><strong>2020</strong>Company founded</div><div className="stat"><strong>80+</strong>Developer community</div><div className="stat"><strong>Global</strong>Remote-first collaboration</div></div></div></section><section className="section alt"><div className="container"><div className="eyebrow">ENGINEERING CAPABILITIES</div><h2>From first idea to lasting impact.</h2><div className="grid-3">{caps.map(([title,text,Icon])=><article className="card" key={title}><Icon color="#0ea5ff"/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="section"><div className="container"><div className="eyebrow">INDUSTRIES WE UNDERSTAND</div><h2>Complex environments. <span className="accent">Thoughtful engineering.</span></h2><div className="stats">{["Financial Services","Healthcare","Telecommunications","Enterprise Technology","E-commerce","Digital Platforms"].map(x=><div className="stat" key={x}>{x}</div>)}</div></div></section><section className="section alt"><div className="container"><div className="eyebrow">BUILD YOUR NEXT CHAPTER</div><h2>Good people make great engineering.</h2><p className="muted">Explore remote opportunities and bring your perspective, curiosity, and craft to a globally connected team.</p><Link className="btn" href="/careers">Explore careers</Link></div></section><section className="section"><div className="container" style={{textAlign:"center"}}><div className="eyebrow">LETâ€™S BUILD SOMETHING MEANINGFUL</div><h2>Your next big idea starts with a conversation.</h2><Link className="btn" href="/contact">Start a conversation</Link></div></section></>}

