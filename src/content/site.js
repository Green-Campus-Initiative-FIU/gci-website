import "server-only";
import { cache } from "react";
import { db } from "@/lib/firebase/admin";
import { SITE_DEFAULTS } from "./defaults";

/*
 * All editable page text. Defaults live in ./defaults.js; anything an admin has
 * changed is stored in Firestore (siteContent/main) and overrides the default
 * key by key. Without Firebase, the defaults are used as-is.
 */
export const getSiteContent = cache(async () => {
  if (!db) return SITE_DEFAULTS;
  try {
    const snap = await db.collection("siteContent").doc("main").get();
    const saved = snap.exists ? snap.data()?.values ?? {} : {};
    return { ...SITE_DEFAULTS, ...saved };
  } catch (e) {
    console.error("getSiteContent error:", e);
    return SITE_DEFAULTS;
  }
});
