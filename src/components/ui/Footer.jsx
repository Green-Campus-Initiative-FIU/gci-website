import Link from "next/link";
import { JOIN_URL, navigation, social } from "@/constants";
import { InstagramIcon, LinkedInIcon } from "@/components/site/icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <nav aria-label="Footer">
            {navigation.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.name}
              </Link>
            ))}
            <Link href="/login">Login</Link>
            <a href={JOIN_URL} target="_blank" rel="noopener">
              Join GCI
            </a>
          </nav>
          <div className="soc">
            <a href={social.instagram.href} target="_blank" rel="noopener" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={social.linkedin.href} target="_blank" rel="noopener" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <div className="huge" aria-hidden="true">
          Green Campus Initiative
        </div>
        <span>© {new Date().getFullYear()} Green Campus Initiative at FIU. All rights reserved.</span>
      </div>
    </footer>
  );
}
