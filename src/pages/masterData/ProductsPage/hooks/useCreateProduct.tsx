import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { CreateProductRequest } from "../../../../api/masterData/requests/product";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { productQueryKey } from "../constants";

export function useCreateProduct() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreateProductRequest) => {
      return await productApi.create(data, accessToken ?? undefined);
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
