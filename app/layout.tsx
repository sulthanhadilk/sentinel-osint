import "./globals.css";
import Link from "next/link";

const links = [
  ["Overview", "/dashboard"], ["Universal search", "/search"], ["Investigations", "/investigations"],
  ["History", "/history"], ["Providers", "/providers"], ["Settings", "/settings"], ["About", "/about"]
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><div className="app"><aside className="sidebar"><Link className="brand" href="/dashboard"><span className="brand-mark">S</span>SENTINEL OSINT</Link><nav className="nav"><div className="nav-label">Workspace</div>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="notice" style={{marginTop:32}}><span className="badge green">LOCAL-FIRST</span><p style={{fontSize:12,lineHeight:1.5}}>No API keys required. Findings are attributed and never treated as identity proof.</p></div></aside><main className="main">{children}</main></div></body></html>
}
