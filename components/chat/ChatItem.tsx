"use client";

import { Trash2 } from "lucide-react";
import { deleteChat } from "@/lib/chatActions";

export default function ChatItem({
  chat,
  userId,
  activeChatId,
  onDelete,
}: {
  chat: { id: string; title: string };
  userId: string;
  activeChatId?: string;
  onDelete: (chatId: string) => void;
}) {
  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this chat?"
    );

    if (!confirmDelete) return;

    await deleteChat(userId, chat.id);
    onDelete(chat.id);
  };

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded hover:bg-gray-200 ${
        activeChatId === chat.id ? "bg-gray-200" : ""
      }`}
    >
      <span className="truncate">{chat.title}</span>

      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700"
        title="Delete chat"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}