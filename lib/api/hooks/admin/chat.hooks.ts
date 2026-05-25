import { useMutation } from "@tanstack/react-query";
import { reindexChatKnowledge } from "../../services/admin/chat.services";
import { toast } from "sonner";

export const useReindexChatKnowledge = () => {
  return useMutation({
    mutationFn: reindexChatKnowledge,
    onSuccess: (data) => {
      toast.success(data.message || "Knowledge base reindexed successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reindex knowledge base");
    },
  });
};
