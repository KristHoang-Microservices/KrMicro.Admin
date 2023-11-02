import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { CreateCategoryRequest } from "../../../../api/masterData/requests/category";
import { categoryApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { categoryQueryKey } from "../constants";

export function useCreateCategory() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreateCategoryRequest) => {
      return await categoryApi.create(data, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi! Kiểm tra lại ik 😥");
      },
      onSuccess: () => {
        toast.success("Đã thêm!");
        queryClient.invalidateQueries([categoryQueryKey.getAll]).then();
      },
    },
  );
}
