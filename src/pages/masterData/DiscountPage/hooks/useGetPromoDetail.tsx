import { useQuery } from "react-query";
import { promoQueryKey } from "../constants/";
import { promoApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { GetDetailPromoRequest } from "../../../../api/orders/requests/promo";

interface UseGetPromoDetailProps {
  request: GetDetailPromoRequest | null;
}

export function useGetPromoDetail({ request }: UseGetPromoDetailProps) {
  return useQuery(
    promoQueryKey.getDetail(request ?? { id: -1 }),
    async () => {
      if (request === null) return null;
      return promoApi.getDetail(request);
    },
    {
      onError: () => {
        toast("Lỗi gồi!");
      },
    },
  );
}
