import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { usersQueryKey } from "../constants";
import { accountApi } from "../../../../api/identity/account.api.ts";
import { UpdateUserRequest } from "../../../../api/identity/requests/account";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const accessToken: string | null = useAppSelector(selectAccessToken);

  return useMutation(
    async (data: UpdateUserRequest) => {
      return await accountApi.update(data, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi! Kiểm tra lại ik 😥");
      },
      onSuccess: () => {
        toast.success("Đã thêm!");
      },
      onSettled: () => queryClient.invalidateQueries([usersQueryKey.getAll]),
    },
  );
}
