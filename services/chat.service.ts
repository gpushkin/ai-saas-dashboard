import { Message, ChatResponse, ChatError } from "@/types/chat";

export class ChatService {
  private static async makeRequest(endpoint: string, data: any): Promise<any> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ChatError = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  }

  static async sendMessage(message: string): Promise<ChatResponse> {
    return this.makeRequest("/api/chat", { message });
  }

  static async saveMessage(userId: string, role: Message["role"], content: string): Promise<void> {
    // Implement your message storage logic here
    // This could save to Firebase, local storage, or another database
    try {
      await this.makeRequest("/api/messages", {
        userId,
        role,
        content,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving message:", error);
      // Don't throw - we don't want to break the chat flow if saving fails
    }
  }

  static async loadChatHistory(userId: string): Promise<Message[]> {
    try {
      const response = await fetch(`/api/messages?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to load chat history");
      }
      return response.json();
    } catch (error) {
      console.error("Error loading chat history:", error);
      return [];
    }
  }
}
