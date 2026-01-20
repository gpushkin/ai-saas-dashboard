"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { chatId } = useParams();
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!auth.currentUser || !chatId) return;

    const checkChat = async () => {
      const chatRef = doc(
        db,
        "users",
        auth.currentUser!.uid,
        "chats",
        chatId as string
      );

      const snap = await getDoc(chatRef);

      if (!snap.exists()) {
        // 🔥 Chat deleted → go back to dashboard
        window.location.replace("/dashboard");
      } else {
        setExists(true);
        setLoading(false);
      }
    };

    checkChat();
  }, [chatId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        Loading chat...
      </div>
    );
  }

  if (!exists) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Your existing components */}
      {/* <ChatMessages chatId={chatId as string} /> */}
      {/* <ChatInput chatId={chatId as string} /> */}
    </div>
  );
}