import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

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
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };
}

const serviceAccount = getServiceAccount();
const appOptions = {};

if (serviceAccount.private_key && serviceAccount.client_email) {
  appOptions.credential = cert(serviceAccount);
} else {
  appOptions.projectId = serviceAccount.projectId || serviceAccount.project_id;
}

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp(appOptions);

export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);
