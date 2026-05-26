import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface ChatConfigData {
  intro: string;
  disclaimerShort: string;
  disclaimerFull: string;
  suggestedPrompts: string[];
  streamingEnabled: boolean;
  loginPath: string;
}

export interface ChatConfigResponse {
  data: ChatConfigData;
}

export interface ChatSessionData {
  sessionId: string;
  expiresAt: string;
}

export interface ChatSessionResponse {
  success: boolean;
  message: string;
  data: ChatSessionData;
}

export const getChatConfig = async (): Promise<ChatConfigResponse> => {
  try {
    const res = await api.get("/chat/config", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const createChatSession = async (): Promise<ChatSessionResponse> => {
  try {
    const res = await fetch('/api/chat/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    if (!res.ok) throw new Error('Failed to create session');
    return await res.json();
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
