import { useQuery } from "react-query";
import { orderQueryKey } from "../constants/";
import { orderApi } from "../../../../api/orders";
import { GetDetailOrderRequest } from "../../../../api/orders/requests/order";

interface UseGetOrderDetailProps {
  request: GetDetailOrderRequest | null;
}

export function useGetOrderDetail({ request }: UseGetOrderDetailProps) {
  return useQuery(orderQueryKey.getDetail(request ?? { id: -1 }), async () => {
    if (request === null) return null;
    return await orderApi.getDetail(request);
  });
}
