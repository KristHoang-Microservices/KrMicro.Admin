import { useMutation, useQueryClient } from "react-query";
import { transactionApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { transactionQueryKey } from "../constants";
import { UpdateTransactionStatusRequest } from "../../../../api/orders/requests/transaction";

interface UseUpdateOrderStatusProps {
  request: UpdateTransactionStatusRequest | null;
}

export function useUpdateTransactionStatus() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ request }: UseUpdateOrderStatusProps) => {
      if (request === null) return null;
      return transactionApi.updateStatus(request, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi!");
      },
      onSuccess: async () => {
        toast.success("Đã cập nhật thành công !");
        await queryClient.invalidateQueries(transactionQueryKey.getAll());
      },
    },
  );
}
