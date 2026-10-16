import ItemsManager from "@/features/dashboard/ItemsManager";
import NoAccess from "@/features/dashboard/NoAccess";
import { canEdit, getCurrentUser } from "@/services/auth.server";
import { getManagedItems } from "@/content/collections";
import FAQ_DEFAULTS from "@/features/about/constants/FAQData";

export default async function Page() {
  if (!canEdit(await getCurrentUser())) return <NoAccess />;
  const items = await getManagedItems("faq");
  return (
    <>
      <div className="dash-head">
        <h1 className="dash-title">FAQ</h1>
        <a className="btn btn-small" href="/about" target="_blank" rel="noopener">
          View on site ↗
        </a>
      </div>
      <ItemsManager collection="faq" items={items} defaults={FAQ_DEFAULTS} intro="These questions appear at the bottom of the About page, in this order." />
    </>
  );
}
