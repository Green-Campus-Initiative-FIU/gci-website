import admin from "firebase-admin";

// The service account comes from .env.local (see README > "Setting up a new Firebase project").
// Without it the site still runs: pages fall back to sample content and logins are disabled.
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

export const isFirebaseConfigured = Boolean(serviceAccountJson);

let db = null;

if (isFirebaseConfigured) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountJson)),
    });
  }
  db = admin.firestore();
} else if (!globalThis.__gciFirebaseWarned) {
  globalThis.__gciFirebaseWarned = true;
  console.warn(
    "⚠️  FIREBASE_SERVICE_ACCOUNT_JSON is not set. Running without Firebase: sample content is shown and logins are disabled."
  );
}

export { db, admin };
