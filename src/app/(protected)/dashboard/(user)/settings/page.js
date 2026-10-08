import ReturnToDashboard from "@/features/dashboard/components/ReturnToDashboard";
import EditUserForm from "@/features/dashboard/user/components/EditUserForm";
import AccountDangerZone from "@/features/dashboard/user/components/AccountDangerZone";

export default function UserSettings() {
  return (
    <div className="mx-auto">
      <ReturnToDashboard />
      <h1 className="text-dark-green px-4 text-2xl font-black">
        Personal Settings
      </h1>
      <EditUserForm />
      <h1 className="text-dark-green mt-4 px-4 text-2xl font-black">
        Change Password
      </h1>
      <AccountDangerZone />
    </div>
  );
}
