import { useQuery } from "react-query";
import { categoryQueryKey } from "../constants/";
import { categoryApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";

export function useGetCategory() {
  return useQuery(
    categoryQueryKey.getAll,
    async () => {
      const res = await categoryApi.getAll();
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
