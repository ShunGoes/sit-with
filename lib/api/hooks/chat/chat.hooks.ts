"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getChatConfig,
  createChatSession,
} from "../../services/chat/chat.services";

export const CHAT_CONFIG_QUERY_KEY = ["chat-config"] as const;

export const useGetChatConfig = () => {
  return useQuery({
    queryKey: CHAT_CONFIG_QUERY_KEY,
    queryFn: getChatConfig,
    staleTime: Infinity, // Configuration usually doesn't change during a session
  });
};

export const useCreateChatSession = () => {
  return useMutation({
    mutationFn: createChatSession,
  });
};
