import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxPnYgaG7QPQ_Se-D4d5WmrWxNuOLUzzA",
  authDomain: "movie-tracker-8d99e.firebaseapp.com",
  projectId: "movie-tracker-8d99e",
  storageBucket: "movie-tracker-8d99e.appspot.com",
  messagingSenderId: "187064029377",
  appId: "1:187064029377:web:421bbc20db7f63dfd28440",
  measurementId: "G-3EGT945020",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
