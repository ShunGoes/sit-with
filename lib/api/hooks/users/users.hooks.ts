import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/users/users.services";

export const useGetAllUsers = (params: any = {}) => {
  return useQuery({
    queryKey: ["users", params.page, params.limit, params.search],
    queryFn: () => getAllUsers(params),
    retry: false,
  });
};
