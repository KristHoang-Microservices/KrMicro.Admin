import { useQuery } from "react-query";
import { categoryQueryKey } from "../constants/";
import { categoryApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { GetDetailCategoryRequest } from "../../../../api/masterData/requests/category";

interface UseGetCategoryDetailProps {
  request: GetDetailCategoryRequest | null;
}

export function useGetCategoryDetail({ request }: UseGetCategoryDetailProps) {
  return useQuery(
    categoryQueryKey.getDetail(request ?? { id: -1 }),
    async () => {
      if (request === null) return null;
      return await categoryApi.getDetail(request);
    },
    {
      onError: () => {
        toast("Lỗi gồi!");
      },
    },
  );
}
