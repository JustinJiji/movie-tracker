import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase";

async function addUser(userId, name) {
  try {
    await setDoc(doc(db, "users", userId), {
      name: name,
      createdAt: new Date(),
    });
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user: ", error);
  }
}
