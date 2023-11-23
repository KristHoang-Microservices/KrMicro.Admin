import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { UpdateOrderRequest } from "../../../../api/orders/requests/order";
import { orderApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { orderQueryKey } from "../constants";

export function useUpdateOrder() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: UpdateOrderRequest) => {
      return await orderApi.update(data, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi! Kiểm tra lại ik 😥");
      },
      onSuccess: () => {
        toast.success("Đã thêm!");
      },
      onSettled: () => queryClient.invalidateQueries([orderQueryKey.getAll]),
    },
  );
}
