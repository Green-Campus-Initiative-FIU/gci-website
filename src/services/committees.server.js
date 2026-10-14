import "server-only";
import { cache } from "react";
import { db } from "@/lib/firebase/admin";
import { committeeData } from "@/features/committees/constants/committeeData";

const ICON_BY_ID = {
  recycling: "recycle",
  energy: "bolt",
  transportation: "bike",
  biodiversity: "leaf",
  outreach: "mega",
  sustainability: "campus",
};

const withDefaults = (c) => ({
  goals: [],
  icon: ICON_BY_ID[c.id] || "leaf",
  ...c,
});

// Active committees from Firestore; falls back to the built-in list when
// Firebase isn't connected or no committees have been created yet.
export const getCommittees = cache(async () => {
  if (db) {
    try {
      const snap = await db.collection("committees").where("active", "==", true).get();
      if (!snap.empty) {
        return snap.docs
          .map((d) => {
            const { createdAt, updatedAt, ...data } = d.data();
            return withDefaults({ id: d.id, ...data });
          })
          .sort((a, b) => a.name.localeCompare(b.name));
      }
    } catch (e) {
      console.error("getCommittees error:", e);
    }
  }
  return committeeData.map(withDefaults);
});

export async function getCommittee(id) {
  const all = await getCommittees();
  return all.find((c) => c.id === id) ?? null;
}
