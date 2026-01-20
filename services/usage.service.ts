import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PLANS } from "../lib/usageConfig";

export async function checkAndIncrementUsage(userId: string) {
  const userRef = doc(db, "users", userId);
  const snap = await getDoc(userRef);

  const now = new Date();

  // First time user
  if (!snap.exists()) {
    await setDoc(userRef, {
      plan: "free",
      dailyCount: 1,
      lastReset: Timestamp.now(),
    });
    return { allowed: true, remaining: PLANS.free.dailyLimit - 1 };
  }

  const data = snap.data();
  const lastReset = data.lastReset.toDate();

  // Reset daily usage
  if (now.toDateString() !== lastReset.toDateString()) {
    await updateDoc(userRef, {
      dailyCount: 1,
      lastReset: Timestamp.now(),
    });
    return {
      allowed: true,
      remaining: PLANS[data.plan].dailyLimit - 1,
    };
  }

  // Limit check
  if (data.dailyCount >= PLANS[data.plan].dailyLimit) {
    return { allowed: false, remaining: 0 };
  }

  // Increment usage
  await updateDoc(userRef, {
    dailyCount: data.dailyCount + 1,
  });

  return {
    allowed: true,
    remaining:
      PLANS[data.plan].dailyLimit - (data.dailyCount + 1),
  };
}