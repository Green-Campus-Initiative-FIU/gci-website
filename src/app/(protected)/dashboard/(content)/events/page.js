import ItemsManager from "@/features/dashboard/ItemsManager";
import NoAccess from "@/features/dashboard/NoAccess";
import { canEdit, getCurrentUser } from "@/services/auth.server";
import { getManagedItems } from "@/content/collections";

export default async function Page() {
  if (!canEdit(await getCurrentUser())) return <NoAccess />;
  const items = await getManagedItems("events");
  return (
    <>
      <div className="dash-head">
        <h1 className="dash-title">Events</h1>
        <a className="btn btn-small" href="/events" target="_blank" rel="noopener">
          View on site ↗
        </a>
      </div>
      <ItemsManager collection="events" items={items} intro="Upcoming events show on the Events page, soonest first. Past events hide automatically." />
    </>
  );
}
