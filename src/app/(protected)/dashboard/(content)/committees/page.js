import ItemsManager from "@/features/dashboard/ItemsManager";
import NoAccess from "@/features/dashboard/NoAccess";
import { canEdit, getCurrentUser } from "@/services/auth.server";
import { getManagedItems } from "@/content/collections";
import { committeeData } from "@/features/committees/constants/committeeData";

export default async function Page() {
  if (!canEdit(await getCurrentUser())) return <NoAccess />;
  const items = await getManagedItems("committees");
  return (
    <>
      <div className="dash-head">
        <h1 className="dash-title">Committees</h1>
        <a className="btn btn-small" href="/committees" target="_blank" rel="noopener">
          View on site ↗
        </a>
      </div>
      <ItemsManager collection="committees" items={items} defaults={committeeData} intro="Each committee gets its own page on the site. Changes show up right away." />
    </>
  );
}
