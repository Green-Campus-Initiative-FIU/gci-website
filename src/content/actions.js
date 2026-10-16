"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase/admin";
import { requireEditor } from "@/services/auth.server";
import { uploadImage } from "@/lib/cloudinary.server";
import { committeeData } from "@/features/committees/constants/committeeData";
import FAQ_DEFAULTS from "@/features/about/constants/FAQData";
import { SCHEMAS, validateItem } from "./schemas";
import { SITE_DEFAULTS } from "./defaults";

// Every action here is admin-only and re-validates input on the server.

const refreshSite = () => revalidatePath("/", "layout");

function schemaFor(collection) {
  return Object.hasOwn(SCHEMAS, collection) ? SCHEMAS[collection] : null;
}

// ** Create or update one item in a managed list (committees, team, events, faq) **
export async function saveItemAction(collection, id, prevState, formData) {
  const { user, error } = await requireEditor();
  if (error) return { error };
  const schema = schemaFor(collection);
  if (!schema) return { error: "Unknown list." };

  const { data, error: invalid } = validateItem(schema, (n) => formData.get(n));
  if (invalid) return { error: invalid };

  const col = db.collection(collection);
  const meta = { updatedAt: new Date(), updatedBy: user.email };
  if (id) {
    const ref = col.doc(id);
    if (!(await ref.get()).exists) return { error: "That item no longer exists." };
    await ref.set({ ...data, ...meta }, { merge: true });
  } else {
    const extra = { createdAt: new Date() };
    if (collection === "committees") extra.active = true;
    if (schema.ordered) extra.order = (await col.count().get()).data().count;
    await col.add({ ...data, ...extra, ...meta });
  }
  refreshSite();
  return { ok: `${schema.label} saved.`, savedAt: Date.now() };
}

// ** Delete one item **
export async function deleteItemAction(collection, id) {
  const { error } = await requireEditor();
  if (error) return { error };
  if (!schemaFor(collection) || !id) return { error: "Unknown item." };
  await db.collection(collection).doc(id).delete();
  refreshSite();
  return { ok: "Deleted." };
}

// ** Move an item up or down (officers, FAQ) **
export async function moveItemAction(collection, id, direction) {
  const { error } = await requireEditor();
  if (error) return { error };
  const schema = schemaFor(collection);
  if (!schema?.ordered) return { error: "This list can't be reordered." };

  const snap = await db.collection(collection).orderBy("order").get();
  const ids = snap.docs.map((d) => d.id);
  const i = ids.indexOf(id);
  const j = direction === "up" ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= ids.length) return { ok: "" };
  [ids[i], ids[j]] = [ids[j], ids[i]];
  const batch = db.batch();
  ids.forEach((docId, order) => batch.update(db.collection(collection).doc(docId), { order }));
  await batch.commit();
  refreshSite();
  return { ok: "Moved." };
}

// ** Copy the built-in committees / FAQ into Firestore so they become editable **
export async function importDefaultsAction(collection) {
  const { user, error } = await requireEditor();
  if (error) return { error };
  const col = db.collection(collection);
  if ((await col.count().get()).data().count > 0) return { error: "This list is already editable." };

  const now = new Date();
  const meta = { createdAt: now, updatedAt: now, updatedBy: user.email };
  const batch = db.batch();
  if (collection === "committees") {
    const icons = { recycling: "recycle", energy: "bolt", transportation: "bike", biodiversity: "leaf", outreach: "mega", sustainability: "campus" };
    for (const c of committeeData) {
      batch.set(col.doc(c.id), { name: c.name, description: c.description, goals: c.goals || [], icon: icons[c.id] || "leaf", active: true, ...meta });
    }
  } else if (collection === "faq") {
    FAQ_DEFAULTS.forEach((f, order) => batch.set(col.doc(), { question: f.question, answer: f.answer, order, ...meta }));
  } else {
    return { error: "Nothing to import for this list." };
  }
  await batch.commit();
  refreshSite();
  return { ok: "Done. You can edit them now." };
}

// ** Upload a photo for a list item or a page (Cloudinary) **
const FOLDERS = new Set(["committees", "team", "site", "events"]);
export async function uploadSiteImageAction(formData) {
  const { error } = await requireEditor();
  if (error) return { error };
  const folder = String(formData.get("folder") || "site");
  if (!FOLDERS.has(folder)) return { error: "Unknown photo folder." };
  const square = formData.get("square") === "1";
  return uploadImage(formData.get("file"), {
    folder,
    transformation: [square ? { width: 600, height: 600, crop: "fill", gravity: "face" } : { width: 1600, crop: "limit" }],
  });
}

// ** Save text/photo changes made with "Edit this page" **
const MAX_TEXT = 2000;
export async function saveSiteContentAction(changes) {
  const { user, error } = await requireEditor();
  if (error) return { error };
  if (!changes || typeof changes !== "object") return { error: "Nothing to save." };

  const clean = {};
  for (const [key, value] of Object.entries(changes)) {
    if (!Object.hasOwn(SITE_DEFAULTS, key)) return { error: `Unknown field: ${key}` };
    if (typeof value !== "string") return { error: "Invalid value." };
    const v = value.replace(/\s+\n/g, "\n").trim();
    if (key.endsWith(".photo")) {
      if (!v.startsWith("https://res.cloudinary.com/") && v !== SITE_DEFAULTS[key]) return { error: "Photos must be uploaded with the photo button." };
    } else if (!v) {
      return { error: "Text can't be empty. Undo, or type something." };
    }
    if (v.length > MAX_TEXT) return { error: "Some text is too long." };
    clean[key] = v;
  }
  if (!Object.keys(clean).length) return { error: "Nothing to save." };

  const ref = db.collection("siteContent").doc("main");
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const before = snap.exists ? snap.data()?.values ?? {} : {};
    const previous = Object.fromEntries(Object.keys(clean).map((k) => [k, before[k] ?? SITE_DEFAULTS[k]]));
    tx.set(ref, { values: { ...before, ...clean }, updatedAt: new Date(), updatedBy: user.email });
    // Keep a history so any edit can be undone later.
    tx.set(ref.collection("history").doc(), { changes: clean, previous, at: new Date(), by: user.email });
  });
  refreshSite();
  return { ok: "Saved. Your changes are live." };
}
