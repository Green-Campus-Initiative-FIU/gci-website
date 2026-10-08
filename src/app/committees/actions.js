"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { admin, db } from "@/lib/firebase/admin";

// Create a new committee
export async function createCommittee(formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");
  const meetingTime = formData.get("meetingTime");
  const meetingLocation = formData.get("meetingLocation");
  const contactEmail = formData.get("contactEmail");
  const tags =
    formData
      .get("tags")
      ?.split(",")
      .map((tag) => tag.trim()) || [];

  if (!name || !description) {
    return { error: "Name and description are required" };
  }

  try {
    // Get user from session
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      return { error: "Not authenticated" };
    }

    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie);

    // Check if user has admin role
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    const userData = userDoc.data();

    if (!userData || userData.role !== "admin") {
      return { error: "Only admins can create committees" };
    }

    // Create committee
    const committee = {
      name,
      description,
      image,
      meetingTime,
      meetingLocation,
      contactEmail,
      tags,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await db.collection("committees").add(committee);

    revalidatePath("/committees");
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error creating committee:", e);
    return { error: "Failed to create committee" };
  }
}

// Update a committee
export async function updateCommittee(id, formData) {
  const name = formData.get("name");
  const description = formData.get("description");
  const image = formData.get("image");
  const meetingTime = formData.get("meetingTime");
  const meetingLocation = formData.get("meetingLocation");
  const contactEmail = formData.get("contactEmail");
  const tags =
    formData
      .get("tags")
      ?.split(",")
      .map((tag) => tag.trim()) || [];
  const active = formData.get("active") === "true";

  if (!name || !description) {
    return { error: "Name and description are required" };
  }

  try {
    // Get user from session
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      return { error: "Not authenticated" };
    }

    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie);

    // Check if user has admin role
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    const userData = userDoc.data();

    if (!userData || userData.role !== "admin") {
      return { error: "Only admins can update committees" };
    }

    // Update committee
    const updateData = {
      name,
      description,
      image,
      meetingTime,
      meetingLocation,
      contactEmail,
      tags,
      active,
      updatedAt: new Date(),
    };

    await db.collection("committees").doc(id).update(updateData);

    revalidatePath("/committees");
    revalidatePath(`/committees/${id}`);
    return { success: true };
  } catch (e) {
    console.error("Error updating committee:", e);
    return { error: "Failed to update committee" };
  }
}

// Delete a committee
export async function deleteCommittee(id) {
  try {
    // Get user from session
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      return { error: "Not authenticated" };
    }

    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie);

    // Check if user has admin role
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    const userData = userDoc.data();

    if (!userData || userData.role !== "admin") {
      return { error: "Only admins can delete committees" };
    }

    await db.collection("committees").doc(id).delete();

    revalidatePath("/committees");
    return { success: true };
  } catch (e) {
    console.error("Error deleting committee:", e);
    return { error: "Failed to delete committee" };
  }
}

// Toggle committee active status
export async function toggleCommitteeStatus(id, active) {
  try {
    // Get user from session
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      return { error: "Not authenticated" };
    }

    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie);

    // Check if user has admin role
    const userDoc = await db.collection("users").doc(decodedToken.uid).get();
    const userData = userDoc.data();

    if (!userData || userData.role !== "admin") {
      return { error: "Only admins can update committee status" };
    }

    await db.collection("committees").doc(id).update({
      active: !active,
      updatedAt: new Date(),
    });

    revalidatePath("/committees");
    revalidatePath(`/committees/${id}`);
    return { success: true };
  } catch (e) {
    console.error("Error toggling committee status:", e);
    return { error: "Failed to update committee status" };
  }
}
