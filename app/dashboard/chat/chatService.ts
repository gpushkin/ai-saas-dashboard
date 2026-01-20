import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function saveMessage(
  userId: string,
  role: "user" | "assistant",
  content: string
) {
  await addDoc(collection(db, "chats"), {
    userId,
    role,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function getChatHistory(userId: string) {
  const q = query(
    collection(db, "chats"),
    where("userId", "==", userId),
    orderBy("createdAt", "asc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}