import { db } from "../config/firebase";
import * as admin from "firebase-admin";

export const getUserByEmail = async (email: string) => {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();
  if (!snapshot.empty) {
    const user = snapshot.docs[0];
    return { userId: user.id, ...user.data() };
  }
  return null;
};

export const createUser = async (email: string) => {
  const newUser = {
    email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const docRef = await db.collection("users").add(newUser);
  return { userId: docRef.id, ...newUser };
};
