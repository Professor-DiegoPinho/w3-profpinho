import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount() {
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (base64) {
    return JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
  }

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (json) {
    return JSON.parse(json);
  }

  return {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };
}

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({ credential: cert(getServiceAccount()) });

export const adminDb = getFirestore(app);
