import { useQuery } from "react-query";
import { orderQueryKey } from "../constants/";
import { orderApi } from "../../../../api/orders";

export function useGetOrders() {
  //const accessToken: string | null = useAppSelector(selectAccessToken);
  return useQuery(orderQueryKey.getAll, async () => {
    const res = await orderApi.getAll();
    let data = res?.listData ?? [];
    data = data.sort((a, b) => a.id - b.id);
    return { ...res, listData: data };
  });
}
