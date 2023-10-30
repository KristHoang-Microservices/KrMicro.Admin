import { useQuery } from "react-query";
import { productQueryKey } from "../constants/";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { GetDetailProductRequest } from "../../../../api/masterData/requests/product";

interface UseGetProductDetailProps {
  request: GetDetailProductRequest | null;
}

export function useGetProductDetail({ request }: UseGetProductDetailProps) {
  return useQuery(
    productQueryKey.getDetail(request ?? { id: -1 }),
    async () => {
      if (request === null) return null;
      return productApi.getDetail(request);
    },
    {
      onError: () => {
        toast("Lỗi gồi!");
      },
    },
  );
}
