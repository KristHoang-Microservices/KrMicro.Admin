import { useQuery } from "react-query";
import { promoQueryKey } from "../constants/";
import { promoApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";

export function useGetPromo() {
  return useQuery(
    promoQueryKey.getAll,
    async () => {
      const res = await promoApi.getAll();
      let data = res?.listData ?? [];
      data = data.sort((a, b) => b.id - a.id);
      return { ...res, listData: data };
    },
    {
      onError: () => {
        toast("Lỗi gồi!");
      },
    },
  );
}
