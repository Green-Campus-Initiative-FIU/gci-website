import { getCurrentUser } from "@/services/auth.server";
import ReturnToDashboard from "@/features/dashboard/components/ReturnToDashboard";
import { redirect } from "next/navigation";
import UserPostsList from "@/features/dashboard/user/components/UserPostsList";

export default async function ViewPostsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto">
      <ReturnToDashboard />
      <h1 className="text-dark-green px-4 text-2xl font-black">My Posts</h1>
      <UserPostsList />
    </div>
  );
}
