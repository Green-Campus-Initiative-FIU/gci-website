// Copies a downloaded Firebase service-account key into .env.local as one line,
// without ever printing the secret.
//
//   npm run set-firebase-key -- ~/Downloads/gci-website-firebase-adminsdk-xxxx.json
//
// Afterwards, delete the downloaded file (or move it somewhere safe outside this project).

import fs from "node:fs";
import path from "node:path";

const keyPath = process.argv[2];
const envPath = path.resolve(process.env.ENV_FILE || ".env.local");
const examplePath = path.resolve(".env.example");

if (!keyPath) {
  console.error("Usage: npm run set-firebase-key -- <path to the downloaded .json key>");
  process.exit(1);
}

let key;
try {
  key = JSON.parse(fs.readFileSync(path.resolve(keyPath.replace(/^~(?=\/)/, process.env.HOME)), "utf8"));
} catch (e) {
  console.error(`Couldn't read that file as JSON: ${e.message}`);
  process.exit(1);
}

for (const field of ["type", "project_id", "private_key", "client_email"]) {
  if (!key[field]) {
    console.error(`That doesn't look like a service-account key (missing "${field}").`);
    console.error("In Firebase: Project settings > Service accounts > Generate new private key.");
    process.exit(1);
  }
}

// Single quotes: dotenv keeps the value literally, so the "\n"s inside private_key survive.
const line = `FIREBASE_SERVICE_ACCOUNT_JSON='${JSON.stringify(key)}'`;

let env = fs.existsSync(envPath)
  ? fs.readFileSync(envPath, "utf8")
  : fs.existsSync(examplePath)
    ? fs.readFileSync(examplePath, "utf8")
    : "";

env = /^FIREBASE_SERVICE_ACCOUNT_JSON=.*$/m.test(env)
  ? env.replace(/^FIREBASE_SERVICE_ACCOUNT_JSON=.*$/m, () => line)
  : `${line}\n${env}`;

fs.writeFileSync(envPath, env.endsWith("\n") ? env : `${env}\n`, { mode: 0o600 });

const publicId = env.match(/^NEXT_PUBLIC_FIREBASE_PROJECT_ID=["']?([^"'\n]*)/m)?.[1];
console.log(`✅ Saved the key for project "${key.project_id}" (${key.client_email}) to ${path.basename(envPath)}.`);
if (publicId && publicId !== key.project_id) {
  console.warn(`⚠️  NEXT_PUBLIC_FIREBASE_PROJECT_ID is "${publicId}", but this key is for "${key.project_id}". They should match.`);
}
console.log("Next: delete the downloaded .json file, or move it somewhere safe outside this folder.");
