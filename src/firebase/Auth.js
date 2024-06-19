import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./Firebase";

// Function to sign up a user and store additional data
export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      watchlist: [],
      watched: [],
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Function to sign in a user
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Fetch additional user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { user, data: userDoc.data() };
    } else {
      throw new Error("No such user data!");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
