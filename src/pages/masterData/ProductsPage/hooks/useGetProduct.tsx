import { useQuery } from "react-query";
import { productQueryKey } from "../constants/";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";

export function useGetProduct() {
  return useQuery(
    productQueryKey.getAll,
    async () => {
      const res = await productApi.getAll();
      let data = res?.listData ?? [];
      data = data.sort((a, b) => a.id - b.id);
      return { ...res, listData: data };
    },
    {
      onError: () => {
        toast("Lỗi gồi!");
      },
    },
  );
}
