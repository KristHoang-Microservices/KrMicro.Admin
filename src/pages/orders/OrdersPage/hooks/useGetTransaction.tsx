import { useQuery, useQueryClient } from "react-query";
import { transactionQueryKey } from "../constants/";
import { transactionApi } from "../../../../api/orders";
import { GetTransactionByOrderIdRequest } from "../../../../api/orders/requests/transaction";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";

interface UseGetTransactionProps {
  request: GetTransactionByOrderIdRequest;
}

export function useGetTransaction({ request }: UseGetTransactionProps) {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();
  return useQuery(
    transactionQueryKey.getByOrderId(request),
    async () => {
      const res = await transactionApi.getByOrderId(
        request,
        accessToken ?? undefined,
      );
      let data = res?.listData ?? [];
      data = data.sort((a, b) => a.id - b.id);
      return { ...res, listData: data };
    },
    {
      onSettled: () =>
        queryClient.invalidateQueries(
          transactionQueryKey.getByOrderId(request),
        ),
    },
  );
}
