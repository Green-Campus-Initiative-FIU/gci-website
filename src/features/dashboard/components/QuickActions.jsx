import DashboardButton from "./DashboardButton";

export default function QuickActions() {
  return (
    <section className="mt-5 flex-col justify-center">
      <h1 className="text-dark-green text-2xl font-black">Quick Actions: </h1>
      <div className="mt-5 flex flex-col gap-1.5 text-white">
        <div className="grid grid-cols-2 gap-2">
          <DashboardButton href="/dashboard/create-post" title="Create Post" />
          <DashboardButton href="/dashboard/view-posts" title="View My Posts" />
          <DashboardButton
            href="/dashboard/create-committee"
            title="Create Committee"
          />
        </div>
      </div>
    </section>
  );
}
