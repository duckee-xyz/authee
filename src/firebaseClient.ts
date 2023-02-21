import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

if (getApps().length === 0) {
  const firebaseClient = JSON.parse(atob(process.env.NEXT_PUBLIC_FIREBASE_CLIENT_CREDENTIALS!)) as FirebaseOptions;
  initializeApp(firebaseClient);
}

// Initialize Firebase
export const firebaseApp = getApp();
export const firebaseAuth = getAuth();
