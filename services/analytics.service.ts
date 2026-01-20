import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getChatAnalytics(userId: string) {
  const chatsRef = collection(db, "users", userId, "chats");
  const snapshot = await getDocs(chatsRef);

  let totalMessages = 0;
  let todayMessages = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyMap: Record<string, number> = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const date = data.createdAt.toDate();
    totalMessages++;

    // Today count
    if (date >= today) {
      todayMessages++;
    }

    // Group by date
    const key = date.toISOString().split("T")[0];
    dailyMap[key] = (dailyMap[key] || 0) + 1;
  });

  return {
    totalMessages,
    todayMessages,
    dailyUsage: dailyMap,
  };
}