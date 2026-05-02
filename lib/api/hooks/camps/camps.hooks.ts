import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCamps,
  getAdminCamps,
  getCamp,
  createCamp,
  updateCamp,
  deleteCamp,
  getCampParticipants,
  CreateCampPayload,
  UpdateCampPayload,
  bookACamp,
  createCampTier,
  updateCampTier,
  deleteCampTier,
  uploadCampImages,
  replaceCampImage,
  updateCampImageMetadata,
  deleteCampImage,
} from "../../services/camps/camps.services";
import { showSuccessToast, showErrorToast } from "@/lib/toast-helpers";
import { CreateCampTierPayload, UpdateCampTierPayload } from "@/types/camps.types";

export const useGetCamps = () => {
  return useQuery({
    queryKey: ["camps",],
    queryFn: getCamps,
    retry: false,
  });
};

export const useGetAdminCamps = (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
  return useQuery({
    queryKey: ["admin-camps", params],
    queryFn: () => getAdminCamps(params),
    retry: false,
  });
};

export const useGetCamp = (campId: string) => {
  return useQuery({
    queryKey: ["camps", campId],
    queryFn: () => getCamp(campId),
    enabled: Boolean(campId),
    retry: false,
  });
};

export const useGetCampParticipants = ({id, params }: {id: string, params?: {page: number, limit: number}}) => {
  return useQuery({
    queryKey: ["camps", id, "participants", params?.page, params?.limit],
    queryFn: () => getCampParticipants(id, params ) ,
    enabled: Boolean(id),
    retry: false,
  });
};

export const useCreateCamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCamp,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useBookACamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookACamp,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateCamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCampPayload }) =>
      updateCamp(id, payload),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps"] });
      queryClient.invalidateQueries({ queryKey: ["camps", variables.id] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteCamp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCamp,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

// ===================== CAMP TIER HOOKS =====================

export const useCreateCampTier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ campId, payload }: { campId: string; payload: CreateCampTierPayload }) =>
      createCampTier(campId, payload),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps", variables.campId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateCampTier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      campId,
      tierId,
      payload,
    }: {
      campId: string;
      tierId: string;
      payload: UpdateCampTierPayload;
    }) => updateCampTier(campId, tierId, payload),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps", variables.campId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteCampTier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ campId, tierId }: { campId: string; tierId: string }) =>
      deleteCampTier(campId, tierId),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps", variables.campId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

// ===================== CAMP IMAGE HOOKS =====================

export const useUploadCampImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      campId,
      files,
      captions,
    }: {
      campId: string;
      files: File[];
      captions?: string[];
    }) => uploadCampImages(campId, files, captions),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps", variables.campId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useUpdateCampImageMetadata = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      campId,
      imageId,
      caption,
      order,
    }: {
      campId: string;
      imageId: string;
      caption?: string;
      order?: number;
    }) => updateCampImageMetadata(campId, imageId, caption, order),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps", variables.campId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useReplaceCampImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      campId,
      imageId,
      payload,
    }: {
      campId: string;
      imageId: string;
      payload: {caption?: string; order?: number};
    }) => replaceCampImage(campId, imageId, payload),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps", variables.campId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

export const useDeleteCampImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ campId, imageId }: { campId: string; imageId: string }) =>
      deleteCampImage(campId, imageId),
    onSuccess: (data, variables) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["camps", variables.campId] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};
