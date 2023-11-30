import { useMutation, useQueryClient } from "react-query";
import { orderApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { UpdateOrderStatusRequest } from "../../../../api/orders/requests/order";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { orderQueryKey } from "../constants";

interface UseUpdateOrderStatusProps {
  request: UpdateOrderStatusRequest | null;
}

export function useUpdateOrderStatus() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ request }: UseUpdateOrderStatusProps) => {
      if (request === null) return null;
      return orderApi.updateStatus(request, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi!");
      },
      onSuccess: () => {
        toast.success("Thành công nè!");
      },
      onSettled: () => queryClient.invalidateQueries(orderQueryKey.getAll()),
    },
  );
}
