"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import ChatItem from "@/components/chat/ChatItem";

interface Chat {
  id: string;
  title: string;
}

export default function ChatSidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.currentUser) return;

    const chatsRef = collection(
      db,
      "users",
      auth.currentUser.uid,
      "chats"
    );

    const unsub = onSnapshot(chatsRef, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Chat[];

      setChats(list);
    });

    return () => unsub();
  }, []);

  const handleDeleteChat = (chatId: string) => {
    // Remove chat from UI
    setChats((prev) =>
      prev.filter((chat) => chat.id !== chatId)
    );

    // If active chat deleted → redirect
    if (chatId === activeChatId) {
      window.location.replace("/dashboard");
    }
  };

  return (
    <aside className="w-64 border-r bg-white p-3">
      <h2 className="font-semibold mb-3">Chats</h2>

      <div className="space-y-1">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            userId={auth.currentUser!.uid}
            activeChatId={activeChatId || undefined}
            onDelete={handleDeleteChat}
          />
        ))}
      </div>
    </aside>
  );
}