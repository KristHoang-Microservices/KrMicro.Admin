import { useQuery } from "react-query";
import { brandQueryKey } from "../constants/";
import { brandApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";

export function useGetBrand() {
  return useQuery(
    brandQueryKey.getAll,
    async () => {
      const res = await brandApi.getAll();
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
