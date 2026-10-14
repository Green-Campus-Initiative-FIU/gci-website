import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { admin, isFirebaseConfigured } from "@/lib/firebase/admin";

export async function GET(request) {
  // cookies() should be awaited before using its value
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value || "";

  if (!sessionCookie || !isFirebaseConfigured) {
    // verification failed return false and 401
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    await admin.auth().verifySessionCookie(sessionCookie, true);
    // verification successful return true and 200
    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
  } catch (e) {
    console.error("Session cookie verification failed:", e.message);
    // verification failed return false and 401
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
