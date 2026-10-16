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
5. **Service account**: Project settings > Service accounts > **Generate new private key**, then load it into `.env.local` (the script never prints the secret):

   ```bash
   npm run set-firebase-key -- ~/Downloads/<the-downloaded-key>.json
   ```

   Then delete the downloaded file. **Never commit or email the key file.** It gives full admin access to the project.
6. **First admin**: accounts are invite-only, so create the very first one by hand in the Firebase Console (**Authentication → Users → Add user**), then run:

   ```bash
   npm run make-admin -- you@fiu.edu
   ```

   After that, admins invite everyone else from the site: **Dashboard → People & access** (editors or admins; invitees get an email link to set their password).
7. **Turn off self sign-up** in Firebase: **Authentication → Settings → User actions →** uncheck **Enable create (sign-up)** (and **Enable deletion**). The site never lets people sign themselves up, and this closes the same door at Firebase.

The site also runs **without** any keys: pages show sample content and logins are disabled. That's handy for working on the design.

## Editing content

Most site content lives in data files:

- Committees: `src/features/committees/constants/committeeData.js`
- Home page stories: `src/features/home/constants/storyData.js`
- FAQ: `src/features/about/constants/FAQData.js`
- Team: `src/features/about/components/Team.jsx`
- Nav / footer / social links: `src/constants/index.js`
- Images: `public/`

## Who can edit

| Access | Can do |
| --- | --- |
| **Admin** | Everything, including inviting and removing people (Dashboard → People & access) |
| **Editor** | Edit text and photos on the site, posts, events, officers, committees, FAQ |
| **No access** | Can log in, can't change anything |

There's always at least one admin: the site won't let you remove or demote the last one, or change your own access.

## Access & ownership

| What | Where | Owned by |
| --- | --- | --- |
| Live site | https://gci-website-eta.vercel.app | Vercel project (updates automatically on every push to `main`) |
| Code | https://github.com/Green-Campus-Inititative-FIU/gci-website (public) | GCI GitHub organization |
| Database + logins | Firebase project `gci-website` | Club Google account |
| Photos | Cloudinary | Club account |

The code is public on purpose: no keys or passwords live in it. **Never commit keys.** They go in `.env.local` (ignored by git) and in Vercel → Settings → Environment Variables.

To avoid losing access when officers graduate, make sure **at least two current officers** are owners on each of:

- GitHub organization
- Firebase project
- Cloudinary account
- Vercel project
- Domain registrar (if any)

## Credits

Originally built by the previous GCI web team (6uan, Brandon Armstrong, and others), continued by Susana Rojas.
