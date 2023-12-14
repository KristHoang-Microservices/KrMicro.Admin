import { useQuery } from "react-query";
import { orderQueryKey } from "../constants/";
import { orderApi } from "../../../../api/orders";
import { GetAllOrderRequest } from "../../../../api/orders/requests/order";

export function useGetOrders(request?: GetAllOrderRequest) {
  //const accessToken: string | null = useAppSelector(selectAccessToken);
  return useQuery(orderQueryKey.getAll(request), async () => {
    const res = await orderApi.getAll(request);
    let data = res?.listData ?? [];
    data = data.sort((a, b) => b.id - a.id);
    return { ...res, listData: data };
  });
}
