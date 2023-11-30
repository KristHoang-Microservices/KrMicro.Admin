import { useMutation, useQueryClient } from "react-query";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { orderApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { transactionQueryKey } from "../constants";
import { CreateOrderRequest } from "../../../../api/orders/requests/order";

export function useCreateTransaction() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CreateOrderRequest) => {
      return await orderApi.create(data, accessToken ?? undefined);
    },
    {
      onSuccess: async () => {
        toast.success("Đã thêm!");
        await queryClient.invalidateQueries(transactionQueryKey.getAll);
      },
    },
  );
}
