import { redirect } from "next/navigation";
import { canEdit, getCurrentUser, isAdmin } from "@/services/auth.server";
import DashNav from "@/features/dashboard/DashNav";

export const metadata = { title: "Dashboard | Green Campus Initiative" };

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="wrap dash">
      <DashNav editor={canEdit(user)} admin={isAdmin(user)} />
      <div className="dash-main">{children}</div>
    </div>
  );
}
