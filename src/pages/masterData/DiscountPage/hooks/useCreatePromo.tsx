import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { CreatePromoRequest } from "../../../../api/orders/requests/promo";
import { promoApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { promoQueryKey } from "../constants";

export function useCreatePromo() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreatePromoRequest) => {
      return await promoApi.create(data, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi! Kiểm tra lại ik 😥");
      },
      onSuccess: () => {
        queryClient.invalidateQueries([promoQueryKey.getAll]).then();
        toast.success("Đã thêm!");
      },
    },
  );
}
