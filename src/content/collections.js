import "server-only";
import { cache } from "react";
import { db } from "@/lib/firebase/admin";
import FAQ_DEFAULTS from "@/features/about/constants/FAQData";
import { SAMPLE_EVENTS, SAMPLE_TEAM } from "./samples";

async function readCollection(name, orderBy) {
  let q = db.collection(name);
  if (orderBy) q = q.orderBy(orderBy);
  const snap = await q.get();
  return snap.docs.map((d) => {
    const { createdAt, updatedAt, ...data } = d.data();
    return { id: d.id, ...data };
  });
}

// Officers shown on the About page ("team" collection, ordered by "order").
// Sample officers are only shown while Firebase isn't connected.
export const getTeam = cache(async () => {
  if (!db) return SAMPLE_TEAM.map((m) => ({ ...m, isSample: true }));
  try {
    return await readCollection("team", "order");
  } catch (e) {
    console.error("getTeam error:", e);
    return [];
  }
});

// Upcoming events ("events" collection, date as YYYY-MM-DD), soonest first.
export const getEvents = cache(async () => {
  const today = new Date().toISOString().slice(0, 10);
  if (!db) return SAMPLE_EVENTS.map((e) => ({ ...e, isSample: true }));
  try {
    const all = await readCollection("events", "date");
    return all.filter((e) => e.date >= today);
  } catch (e) {
    console.error("getEvents error:", e);
    return [];
  }
});

// FAQ ("faq" collection, ordered by "order"); falls back to the built-in questions.
export const getFaq = cache(async () => {
  if (db) {
    try {
      const saved = await readCollection("faq", "order");
      if (saved.length) return saved;
    } catch (e) {
      console.error("getFaq error:", e);
    }
  }
  return FAQ_DEFAULTS;
});

// Raw items for the dashboard editors (no fallbacks), as plain objects.
export async function getManagedItems(collection) {
  if (!db) return [];
  const order = { team: "order", faq: "order", events: "date" }[collection];
  const items = await readCollection(collection, order);
  const plain = items.map(({ updatedBy, active, ...rest }) => rest);
  if (collection === "committees") plain.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  return plain;
}
