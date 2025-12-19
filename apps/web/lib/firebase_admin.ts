import * as admin from 'firebase-admin';

// Check if app is already initialized to prevent "App already exists" error (hot reload safe)
if (!admin.apps.length) {
    // In production, we use Env Vars. For dev (if no env vars), we can fallback or throw.
    // We use standard env vars supported by Vercel for the private key.

    const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : undefined;

    if (process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: privateKey,
            }),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
        });
    } else {
        // Setup for mock/dev if no credentials (optional)
        console.warn("Firebase credentials missing. App running in offline/mock mode.");
    }
}

export const db = admin.apps.length ? admin.database() : null;
export { admin };
