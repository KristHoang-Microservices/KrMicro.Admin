import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { CreateBrandRequest } from "../../../../api/masterData/requests/brand";
import { brandApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { brandQueryKey } from "../constants";

export function useCreateBrand() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreateBrandRequest) => {
      return await brandApi.create(data, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi! Kiểm tra lại ik 😥");
      },
      onSuccess: () => {
        toast.success("Đã thêm!");
        queryClient.invalidateQueries([brandQueryKey.getAll]).then();
      },
    },
  );
}
