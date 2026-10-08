import admin from "firebase-admin";

// 1. Get the JSON string from the environment variable.
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

// 2. Add a check to make sure the variable exists.
if (!serviceAccountJson) {
  throw new Error(
    "The FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set. Please check your .env.local file and restart the server."
  );
}

// 3. THE FIX: Parse the JSON string ONCE to create a JavaScript object.
const serviceAccount = JSON.parse(serviceAccountJson);

// 4. Initialize the app with the parsed OBJECT.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin SDK initialized successfully.");
}

const db = admin.firestore();
export { db, admin };
