export interface Message {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
  userId?: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  title?: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatResponse {
  reply: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatError {
  error: string;
  code?: string;
}
