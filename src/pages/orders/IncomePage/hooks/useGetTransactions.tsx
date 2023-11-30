import { useQuery } from "react-query";
import { transactionQueryKey } from "../constants/";
import { transactionApi } from "../../../../api/orders";
import { GetAllTransactionRequest } from "../../../../api/orders/requests/transaction";

export function useGetTransactions(request?: GetAllTransactionRequest) {
  //const accessToken: string | null = useAppSelector(selectAccessToken);
  return useQuery(transactionQueryKey.getAll(request), async () => {
    const res = await transactionApi.getAll(request);
    let data = res?.listData ?? [];
    data = data.sort((a, b) => a.id - b.id);
    return { ...res, listData: data };
  });
}
