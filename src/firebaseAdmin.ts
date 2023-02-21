import { app, apps, credential, initializeApp } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

if (!apps.length) {
  const adminCredentials = Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS!, 'base64').toString('utf-8');
  initializeApp({
    credential: credential.cert(JSON.parse(adminCredentials)),
  });
}

export const firebaseApp = app();
export const firebaseAuth = getAuth(firebaseApp);
