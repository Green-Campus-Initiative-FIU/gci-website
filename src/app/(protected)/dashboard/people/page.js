import NoAccess from "@/features/dashboard/NoAccess";
import PeopleManager from "@/features/dashboard/PeopleManager";
import { admin, db } from "@/lib/firebase/admin";
import { getCurrentUser, isAdmin } from "@/services/auth.server";

export const metadata = { title: "People & access | Green Campus Initiative" };

export default async function PeoplePage() {
  const me = await getCurrentUser();
  if (!isAdmin(me)) return <NoAccess />;

  const [{ users }, profiles] = await Promise.all([admin.auth().listUsers(1000), db.collection("users").get()]);
  const byUid = new Map(profiles.docs.map((d) => [d.id, d.data()]));
  const people = users
    .map((u) => {
      const p = byUid.get(u.uid) ?? {};
      return {
        uid: u.uid,
        email: u.email,
        name: p.name || u.displayName || "",
        role: p.role === "admin" || p.role === "editor" ? p.role : "none",
        lastLogin: u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null,
        invitedBy: p.invitedBy ?? null,
        isMe: u.uid === me.uid,
      };
    })
    .sort((a, b) => (a.isMe ? -1 : b.isMe ? 1 : a.email.localeCompare(b.email)));

  return (
    <>
      <h1 className="dash-title">People &amp; access</h1>
      <p className="dash-intro">
        Only people you invite can log in. <b>Editors</b> can change the website, posts, events, officers, committees and FAQ. <b>Admins</b> can also invite and remove people.
      </p>
      <PeopleManager people={people} />
    </>
  );
}
