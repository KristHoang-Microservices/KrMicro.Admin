import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { UpdateBrandRequest } from "../../../../api/masterData/requests/brand";
import { brandApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { brandQueryKey } from "../constants";

export function useUpdateBrand() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: UpdateBrandRequest) => {
      return await brandApi.update(data, accessToken ?? undefined);
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
