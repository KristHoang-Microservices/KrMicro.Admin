import { useQuery } from "react-query";
import { productQueryKey } from "../constants/";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";

export function useGetProduct() {
  return useQuery(
    productQueryKey.getAll,
    () => {
      return productApi.getAll();
    },
    {
      onError: () => {
        toast("Lỗi gồi!");
      },
    },
  );
}
