import ItemsManager from "@/features/dashboard/ItemsManager";
import NoAccess from "@/features/dashboard/NoAccess";
import { canEdit, getCurrentUser } from "@/services/auth.server";
import { getManagedItems } from "@/content/collections";

export default async function Page() {
  if (!canEdit(await getCurrentUser())) return <NoAccess />;
  const items = await getManagedItems("team");
  return (
    <>
      <div className="dash-head">
        <h1 className="dash-title">Officers</h1>
        <a className="btn btn-small" href="/about" target="_blank" rel="noopener">
          View on site ↗
        </a>
      </div>
      <ItemsManager collection="team" items={items} intro="Officers appear on the About page in this order. Use the arrows to reorder." />
    </>
  );
}
