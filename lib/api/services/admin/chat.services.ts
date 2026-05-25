import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface ReindexResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const reindexChatKnowledge = async (
  data: FormData,
): Promise<ReindexResponse> => {
  try {
    const res = await api.post("/admin/chat/reindex", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};
