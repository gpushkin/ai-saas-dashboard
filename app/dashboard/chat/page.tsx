"use client";

import { useState } from "react";
import ModeSelector from "@/app/components/ModeSelector";
import { canUseAI, getRemainingUsage, type Plan } from "@/app/lib/plans";

/* ===============================
   TYPES
================================ */
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: Message[];
};

export default function ChatPage() {
  /* ===============================
     USER PLAN (TEMP)
  ================================ */
  const userPlan: Plan = "free";

  /* ===============================
     STATE
  ================================ */
  const [usedCount, setUsedCount] = useState(0);
  const [mode, setMode] = useState("developer");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  /* ===============================
     CREATE NEW CHAT
  ================================ */
  const createNewChat = () => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setInput("");
  };

  /* ===============================
     SEND MESSAGE
  ================================ */
  const sendMessage = async () => {
    if (!input.trim() || loading || !activeChat) return;

    if (!canUseAI(userPlan, usedCount)) {
      alert("Monthly limit reached. Upgrade your plan.");
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    updateMessages([...activeChat.messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          mode,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      updateMessages([
        ...activeChat.messages,
        userMessage,
        aiMessage,
      ]);

      setUsedCount(prev => prev + 1);

      if (activeChat.messages.length === 0) {
        renameChat(activeChat.id, userMessage.content.slice(0, 30));
      }
    } catch {
      alert("AI failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     CHAT HELPERS
  ================================ */
  const updateMessages = (messages: Message[]) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages }
          : chat
      )
    );
  };

  const renameChat = (id: string, title: string) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === id ? { ...chat, title } : chat
      )
    );
  };

  const deleteChat = (id: string) => {
    if (!confirm("Delete this chat?")) return;

    setChats(prev => prev.filter(chat => chat.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  /* ===============================
     MESSAGE ACTIONS
  ================================ */
  const deleteMessage = (messageId: string) => {
    if (!activeChat) return;

    updateMessages(
      activeChat.messages.filter(m => m.id !== messageId)
    );
  };

  const editMessage = (messageId: string, oldText: string) => {
    const updated = prompt("Edit message", oldText);
    if (!updated || !activeChat) return;

    updateMessages(
      activeChat.messages.map(m =>
        m.id === messageId ? { ...m, content: updated } : m
      )
    );
  };

  /* ===============================
     UI
  ================================ */
  return (
    <div className="flex h-[calc(100vh-64px)] bg-zinc-50">
      {/* SIDEBAR */}
      <aside className="w-72 border-r bg-white p-4 flex flex-col">
        <button
          onClick={createNewChat}
          className="mb-4 bg-black text-white py-2 rounded-lg"
        >
          + New Chat
        </button>

        <div className="space-y-2 overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                chat.id === activeChatId
                  ? "bg-zinc-200"
                  : "hover:bg-zinc-100"
              }`}
            >
              <span
                onClick={() => setActiveChatId(chat.id)}
                className="cursor-pointer truncate"
              >
                {chat.title}
              </span>

              <button
                onClick={() => deleteChat(chat.id)}
                className="text-red-600 text-xs"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* CHAT AREA */}
      <main className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold">AI Chat</h1>
          <ModeSelector mode={mode} setMode={setMode} />
        </div>

        <div className="text-xs text-zinc-500 mb-4">
          Plan: <b>{userPlan.toUpperCase()}</b> · Remaining:
          <b className="ml-1">
            {getRemainingUsage(userPlan, usedCount)}
          </b>
        </div>

        <div className="flex-1 border rounded-lg p-4 space-y-4 overflow-y-auto bg-white">
          {!activeChat && (
            <p className="text-sm text-zinc-500">
              Start a new chat to begin.
            </p>
          )}

          {activeChat?.messages.map(msg => (
            <div
              key={msg.id}
              className={`relative group max-w-[70%] p-3 rounded-lg whitespace-pre-wrap ${
                msg.role === "user"
                  ? "ml-auto bg-black text-white"
                  : "bg-zinc-200"
              }`}
            >
              {msg.content}

              {msg.role === "user" && (
                <div className="absolute top-1 right-1 hidden group-hover:flex gap-2">
                  <button
                    onClick={() => editMessage(msg.id, msg.content)}
                    className="text-xs"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="text-xs"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <p className="text-sm text-zinc-500">AI is thinking...</p>
          )}
        </div>

        {activeChat && (
          <div className="flex gap-2 mt-4">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 border rounded-lg p-3 h-24"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-black text-white px-6 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
