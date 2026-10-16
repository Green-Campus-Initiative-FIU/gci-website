import Link from "next/link";
import Image from "@/components/site/SiteImage";
import { canEdit, getCurrentUser, isAdmin, roleLabel } from "@/services/auth.server";

const ACTIONS = [
  { href: "/#edit", title: "Edit the website", text: "Change text and photos right on the page", hl: true, full: true },
  { href: "/dashboard/create-post", title: "Write a post", text: "News, event recaps, articles" },
  { href: "/dashboard/view-posts", title: "Posts", text: "Publish, edit, feature or delete" },
  { href: "/dashboard/events", title: "Events", text: "What's coming up" },
  { href: "/dashboard/team", title: "Officers", text: "Who's on the team this year" },
  { href: "/dashboard/committees", title: "Committees", text: "Descriptions, goals, meetings" },
  { href: "/dashboard/faq", title: "FAQ", text: "Questions on the About page" },
  { href: "/dashboard/people", title: "People & access", text: "Invite editors and admins", adminOnly: true },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const editor = canEdit(user);
  const admin = isAdmin(user);
  const name = user.profile?.name || user.email;

  return (
    <>
      <div className="welcome">
        <div className="panel panel-dark">
          <span className="label">Dashboard</span>
          <h1 className="dash-title">Welcome, {name.split(" ")[0].split("@")[0]}</h1>
          <p style={{ marginTop: 10, maxWidth: "34em" }}>
            {editor
              ? "Update the website, post news, and manage committees, officers and events. Changes go live within seconds."
              : "You're logged in, but your account doesn't have editing access yet. Ask a GCI admin to give you access."}
          </p>
        </div>
        <div className="panel usercard">
          <span className="avatar avatar-lg">
            {user.profile?.avatarUrl ? <Image src={user.profile.avatarUrl} alt="" fill sizes="72px" style={{ objectFit: "cover" }} /> : name[0].toUpperCase()}
          </span>
          <div>
            <b style={{ fontSize: 18 }}>{user.profile?.name || "Add your name"}</b>
            <div className="date">{user.email}</div>
            <span className="role-pill">{roleLabel(user)}</span>
            <div>
              <Link href="/dashboard/settings" className="small-link">
                Edit my account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {editor && (
        <>
          <h2 className="label" style={{ marginBottom: 12 }}>
            What do you want to do?
          </h2>
          <div className="actions-grid">
            {ACTIONS.filter((a) => admin || !a.adminOnly).map((a) =>
              a.href.startsWith("/#") ? (
                <a key={a.href} className={`qa${a.hl ? " hl" : ""}`} href={a.href}>
                  <b>{a.title}</b>
                  <span>{a.text}</span>
                </a>
              ) : (
                <Link key={a.href} className="qa" href={a.href}>
                  <b>{a.title}</b>
                  <span>{a.text}</span>
                </Link>
              )
            )}
          </div>
        </>
      )}
    </>
  );
}
