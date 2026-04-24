import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/users/users.services";

export const USERS_QUERY_KEY = ["users"] as const;

export const useGetAllUsers = (params = {}) => {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, params],
    queryFn: () => getAllUsers(params),
    retry: false,
  });
};
