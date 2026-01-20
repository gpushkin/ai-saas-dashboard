import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

/**
 * Deletes a chat and all its messages
 */
export async function deleteChat(
  userId: string,
  chatId: string
) {
  // 1️⃣ Delete messages subcollection
  const messagesRef = collection(
    db,
    "users",
    userId,
    "chats",
    chatId,
    "messages"
  );

  const messagesSnap = await getDocs(messagesRef);

  await Promise.all(
    messagesSnap.docs.map((msg) =>
      deleteDoc(msg.ref)
    )
  );

  // 2️⃣ Delete chat document
  await deleteDoc(
    doc(db, "users", userId, "chats", chatId)
  );
}
