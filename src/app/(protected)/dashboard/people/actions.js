"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { admin, db } from "@/lib/firebase/admin";
import { requireAdmin, ROLES } from "@/services/auth.server";

// Accounts are invite-only: admins create them here. The invitee gets a link
// to set their own password; nobody ever types or sees someone else's password.

const VALID_ROLES = new Set([...Object.keys(ROLES), "none"]);

async function setupLink(email) {
  // Bring them back to the login page after they set their password, when possible.
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  try {
    return await admin.auth().generatePasswordResetLink(email, { url: `${origin}/login` });
  } catch {
    return admin.auth().generatePasswordResetLink(email); // domain not authorized yet
  }
}

async function adminCount() {
  return (await db.collection("users").where("role", "==", "admin").count().get()).data().count;
}

// ** Invite someone **
export async function inviteAction(prevState, formData) {
  const { user, error } = await requireAdmin();
  if (error) return { error };

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const name = String(formData.get("name") || "").trim().slice(0, 80);
  const role = String(formData.get("role") || "editor");
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter a valid email address." };
  if (!ROLES[role]) return { error: "Pick Editor or Admin." };

  try {
    await admin.auth().getUserByEmail(email);
    return { error: "That email already has an account. Change their access in the list below." };
  } catch (e) {
    if (e.code !== "auth/user-not-found") return { error: "Couldn't check that email. Try again." };
  }

  // A long random password nobody knows; they choose their own with the setup link.
  const created = await admin.auth().createUser({ email, displayName: name || undefined, password: randomBytes(24).toString("base64url") });
  await db.collection("users").doc(created.uid).set({ email, name, role, invitedBy: user.email, createdAt: new Date(), updatedAt: new Date() });

  revalidatePath("/dashboard/people");
  return { ok: true, email, link: await setupLink(email), at: Date.now() };
}

// ** Change someone's access **
export async function setRoleAction(uid, role) {
  const { user, error } = await requireAdmin();
  if (error) return { error };
  if (!VALID_ROLES.has(role)) return { error: "Unknown access level." };
  if (uid === user.uid) return { error: "You can't change your own access. Ask another admin." };

  const ref = db.collection("users").doc(uid);
  const current = (await ref.get()).data()?.role;
  if (current === "admin" && role !== "admin" && (await adminCount()) <= 1) {
    return { error: "There has to be at least one admin." };
  }
  await ref.set({ role, updatedAt: new Date(), updatedBy: user.email }, { merge: true });
  revalidatePath("/dashboard/people");
  return { ok: "Access updated." };
}

// ** Remove someone completely (they're logged out immediately) **
export async function removePersonAction(uid) {
  const { user, error } = await requireAdmin();
  if (error) return { error };
  if (uid === user.uid) return { error: "You can't remove yourself." };

  const ref = db.collection("users").doc(uid);
  if ((await ref.get()).data()?.role === "admin" && (await adminCount()) <= 1) {
    return { error: "There has to be at least one admin." };
  }
  try {
    await admin.auth().deleteUser(uid);
  } catch (e) {
    if (e.code !== "auth/user-not-found") return { error: "Couldn't remove that account. Try again." };
  }
  await ref.delete();
  revalidatePath("/dashboard/people");
  return { ok: "Removed. Their posts stay on the site." };
}

// ** New setup link (if the invite email got lost) **
export async function newSetupLinkAction(uid) {
  const { error } = await requireAdmin();
  if (error) return { error };
  const { email } = await admin.auth().getUser(uid);
  return { ok: true, email, link: await setupLink(email), at: Date.now() };
}
