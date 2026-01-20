import { useEffect, useState } from "react";
import { getChatAnalytics } from "@/services/analytics.service";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAnalytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const analytics = await getChatAnalytics(user.uid);
      setData(analytics);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { data, loading };
}