import { getCurrentUser, roleLabel } from "@/services/auth.server";
import AccountForms from "@/features/dashboard/AccountForms";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  return (
    <>
      <h1 className="dash-title">My account</h1>
      <AccountForms
        email={user.email}
        name={user.profile?.name ?? ""}
        bio={user.profile?.bio ?? ""}
        avatarUrl={user.profile?.avatarUrl ?? ""}
        role={roleLabel(user)}
      />
    </>
  );
}
