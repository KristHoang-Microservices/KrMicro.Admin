import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { UpdateCategoryRequest } from "../../../../api/masterData/requests/category";
import { categoryApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { categoryQueryKey } from "../constants";

export function useUpdateCategory() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: UpdateCategoryRequest) => {
      return await categoryApi.update(data, accessToken ?? undefined);
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
