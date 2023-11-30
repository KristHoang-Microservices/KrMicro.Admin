import { useQuery } from "react-query";
import { transactionQueryKey } from "../constants/";
import { transactionApi } from "../../../../api/orders";
import { GetDetailTransactionRequest } from "../../../../api/orders/requests/transaction";

interface UseGetTransactionDetail {
  request: GetDetailTransactionRequest | null;
}

export function useGetTransactionDetail({ request }: UseGetTransactionDetail) {
  return useQuery(
    transactionQueryKey.getDetail(request ?? { id: -1 }),
    async () => {
      if (request === null) return null;
      return await transactionApi.getDetail(request);
    },
  );
}
