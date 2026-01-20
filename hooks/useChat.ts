import { useState, useCallback, useEffect } from "react";
import { checkUsage } from "@/hooks/useUsage";
import { Message } from "@/types/chat";
import { ChatService } from "@/services/chat.service";

export const useChat = (userId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Load chat history when userId changes
  useEffect(() => {
    if (userId) {
      const loadHistory = async () => {
        const history = await ChatService.loadChatHistory(userId);
        setMessages(history);
      };
      loadHistory();
    } else {
      setMessages([]);
    }
  }, [userId]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !userId) return;

    // 🔒 CHECK USAGE BEFORE AI CALL
    try {
      await checkUsage(userId);
    } catch {
      alert("Daily limit reached. Upgrade to Pro.");
      return;
    }

    // User message
    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    await ChatService.saveMessage(userId, "user", text);

    setLoading(true);

    try {
      const data = await ChatService.sendMessage(text);

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      await ChatService.saveMessage(userId, "assistant", data.reply);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally add error message to chat
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    clearMessages,
  };
};