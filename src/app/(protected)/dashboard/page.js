import { getCurrentUser } from "@/services/auth.server";
import WelcomePanel from "@/features/dashboard/components/WelcomePanel";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return <WelcomePanel user={user} />;
}
