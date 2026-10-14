// Gives an existing account admin access (lets them edit the site and manage committees).
// The person must sign up on the site first.
//
//   npm run make-admin -- someone@fiu.edu
//   npm run make-admin -- someone@fiu.edu --remove

import admin from "firebase-admin";

const email = process.argv[2];
const remove = process.argv.includes("--remove");

if (!email) {
  console.error("Usage: npm run make-admin -- <email> [--remove]");
  process.exit(1);
}
if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  console.error("FIREBASE_SERVICE_ACCOUNT_JSON isn't set. Run `npm run set-firebase-key -- <key.json>` first.");
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)) });

try {
  const user = await admin.auth().getUserByEmail(email);
  await admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set({ email: user.email, role: remove ? "viewer" : "admin", updatedAt: new Date() }, { merge: true });
  console.log(remove ? `✅ ${email} is no longer an admin.` : `✅ ${email} is now an admin.`);
} catch (e) {
  if (e.code === "auth/user-not-found") {
    console.error(`No account found for ${email}. They need to sign up on the site first (/login > Sign up).`);
  } else {
    console.error(`Something went wrong: ${e.message}`);
  }
  process.exit(1);
}
