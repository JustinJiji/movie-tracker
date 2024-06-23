import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import fbconfig from "../env";

const firebaseConfig = {
  apiKey: fbconfig.REACT_APP_FIREBASE_API_KEY,
  authDomain: fbconfig.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: fbconfig.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: fbconfig.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: fbconfig.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: fbconfig.REACT_APP_FIREBASE_APP_ID,
  measurementId: fbconfig.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
