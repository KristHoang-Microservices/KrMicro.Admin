import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { UpdatePromoRequest } from "../../../../api/orders/requests/promo";
import { promoApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { promoQueryKey } from "../constants";

export function useUpdatePromo() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: UpdatePromoRequest) => {
      return await promoApi.update(data, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi! Kiểm tra lại ik 😥");
      },
      onSuccess: () => {
        toast.success("Đã thêm!");
        queryClient.invalidateQueries([promoQueryKey.getAll]).then();
      },
    },
  );
}
