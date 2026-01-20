import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔹 Read from environment (Next.js public envs)
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// 🔐 Validate env early (good practice – keep this!)
function validateFirebaseEnv() {
  if (!API_KEY || !AUTH_DOMAIN || !PROJECT_ID) {
    throw new Error(
      "Missing Firebase environment variables. Please check .env.local:\n" +
        "NEXT_PUBLIC_FIREBASE_API_KEY\n" +
        "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n" +
        "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
    );
  }

  if (API_KEY.includes(" ")) {
    throw new Error(
      "NEXT_PUBLIC_FIREBASE_API_KEY contains whitespace. Check Firebase console → Project Settings → Web API Key."
    );
  }
}

// ✅ Run validation once
validateFirebaseEnv();

// ✅ USE ENV VARIABLES (NO HARDCODING)
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
};

// ✅ Prevent re-initialization during hot reloads
export const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// 🔐 Auth
export const auth = getAuth(app);

// 🔥 CRITICAL FIX (ADD THIS)
setPersistence(auth, browserSessionPersistence);

// 🧠 Firestore (REQUIRED for chat history)
export const db = getFirestore(app);