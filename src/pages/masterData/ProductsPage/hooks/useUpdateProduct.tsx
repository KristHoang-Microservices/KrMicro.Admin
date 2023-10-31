import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { UpdateProductRequest } from "../../../../api/masterData/requests/product";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { productQueryKey } from "../constants";

export function useUpdateProduct() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: UpdateProductRequest) => {
      return await productApi.update(data, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi! Kiểm tra lại ik 😥");
      },
      onSuccess: () => {
        toast.success("Đã thêm!");
        queryClient.invalidateQueries([productQueryKey.getAll]).then();
      },
    },
  );
}
