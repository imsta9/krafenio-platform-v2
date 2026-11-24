
import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" aria-label="KRAFENIO homepage">
          <Image
            src="/brand/krafenio-logo.png"
            alt="KRAFENIO"
            width={260}
            height={87}
            priority
            style={{
              width: 220,
              height: "auto",
              mixBlendMode: "screen",
            }}
          />
        </Link>

        <nav className="nav">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link className="btn" href="/contact">
          Start a project
        </Link>
      </div>
    </header>
  );
}
