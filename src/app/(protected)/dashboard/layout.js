import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/auth.server";
import UserCard from "@/features/dashboard/components/UserCard";
import QuickActions from "@/features/dashboard/components/QuickActions";
import DashboardButton from "@/features/dashboard/components/DashboardButton";

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="padding-container max-container flex flex-col gap-6 py-16 lg:flex-row">
      {/* Left Sidebar */}
      <div className="flex w-full flex-col space-y-3.5 lg:w-4/12">
        <UserCard />
        <DashboardButton
          href="/dashboard/settings"
          title="Edit Account"
          textSize="text-2xl"
        />
        <QuickActions />
      </div>
      {/* Right Main Content (changes per route) */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
