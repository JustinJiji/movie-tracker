import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export const addToWatchlist = async (name, id) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      watchlist: arrayUnion({ name, id }),
    });
  } else {
    throw new Error("User not authenticated");
  }
};

export const addToWatched = async (name, id) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      watched: arrayUnion({ name, id }),
    });
  } else {
    throw new Error("User not authenticated");
  }
};

export const removeFromWatchlist = async (name, id) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const watchlist = userDoc.data().watchlist || [];
      const updatedWatchlist = watchlist.filter(
        (item) => !(item.id === id && item.name === name)
      );
      await updateDoc(userRef, { watchlist: updatedWatchlist });
    }
  } else {
    throw new Error("User not authenticated");
  }
};

export const removeFromWatched = async (name, id) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const watched = userDoc.data().watched || [];
      const updatedWatched = watched.filter(
        (item) => !(item.id === id && item.name === name)
      );
      await updateDoc(userRef, { watched: updatedWatched });
    }
  } else {
    throw new Error("User not authenticated");
  }
};


export const getUserMediaLists = async () => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? userDoc.data() : { watchlist: [], watched: [] };
  } else {
    throw new Error("User not authenticated");
  }
};
