import { useQuery } from "react-query";
import { productQueryKey } from "../constants/";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { GetProductsByIdsRequest } from "../../../../api/masterData/requests/product";

export function useGetProductsByIds({
  request: { ids },
}: {
  request: GetProductsByIdsRequest;
}) {
  return useQuery(
    productQueryKey.getByIds(ids),
    async () => {
      const res = await productApi.getByIds({ ids });
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
