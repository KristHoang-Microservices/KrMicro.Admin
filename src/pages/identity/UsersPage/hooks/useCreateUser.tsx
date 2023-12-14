import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { usersQueryKey } from "../constants";
import { accountApi } from "../../../../api/identity/account.api.ts";
import { CreateUserRequest } from "../../../../api/identity/requests/account";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreateUserRequest) => {
      return await accountApi.create(data);
    },
    {
      onSuccess: async () => {
        toast.success("Đã thêm!");
        await queryClient.invalidateQueries(usersQueryKey.getAll);
      },
    },
  );
}
