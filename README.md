# GCI Website

Website for the Green Campus Initiative (GCI) club at FIU.

Built with [Next.js](https://nextjs.org) (App Router), React, Tailwind CSS, Firebase (Auth + Firestore), and Cloudinary.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in the values (see [Services](#services) below for where each one comes from):

   ```bash
   cp .env.example .env.local
   ```

3. Run the dev server and open [http://localhost:3000](http://localhost:3000):

   ```bash
   npm run dev
   ```

## Services

| Service | Used for | Where to get the keys |
| --- | --- | --- |
| Firebase Auth | Member login (email/password) | Firebase Console > Project settings > General |
| Firestore | `users`, `posts`, `committees` collections | Accessed only from the server via the Admin SDK |
| Firebase Admin SDK | Server-side auth + database access | Project settings > Service accounts > Generate new private key |
| Cloudinary | Profile picture uploads | Cloudinary Console > Settings > API Keys |
| Vercel | Hosting | Add the same env vars under Project > Settings > Environment Variables |

### Setting up a new Firebase project

1. Create a project in the [Firebase Console](https://console.firebase.google.com).
2. **Authentication** > Sign-in method > enable **Email/Password**.
3. **Firestore Database** > create database. Collections are created automatically on first write.
4. **Rules**: paste the contents of `firestore.rules` into Firestore > Rules (or run `firebase deploy --only firestore:rules`). The rules deny all direct browser access because all database access goes through the server.
5. **Service account**: generate a private key, convert the JSON to a single line, and put it in `FIREBASE_SERVICE_ACCOUNT_JSON`.
   **Never commit the key file.** It gives full admin access to the project.
6. **First admin**: sign up on the site, then in Firestore set `role: "admin"` on your document in the `users` collection.

## Editing content

Most site content lives in data files:

- Committees: `src/features/committees/constants/committeeData.js`
- Home page stories: `src/features/home/constants/storyData.js`
- FAQ: `src/features/about/constants/FAQData.js`
- Team: `src/features/about/components/Team.jsx`
- Nav / footer / social links: `src/constants/index.js`
- Images: `public/`

## Access & ownership

To avoid losing access when officers graduate, make sure **at least two current officers** are owners on each of:

- GitHub organization
- Firebase project
- Cloudinary account
- Vercel project
- Domain registrar (if any)

## Credits

Originally built by the previous GCI web team (6uan, Brandon Armstrong, and others), continued by Susana Rojas.
