import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

if (!admin.apps.length) {
  const adminCredentials = Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS!, 'base64').toString('utf-8');
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(adminCredentials)),
  });
}

export const firebaseApp = admin.app();
export const firebaseAuth = getAuth(firebaseApp);
