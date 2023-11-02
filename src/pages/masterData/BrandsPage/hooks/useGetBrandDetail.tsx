import { useQuery } from "react-query";
import { brandQueryKey } from "../constants/";
import { brandApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { GetDetailBrandRequest } from "../../../../api/masterData/requests/brand";

interface UseGetBrandDetailProps {
  request: GetDetailBrandRequest | null;
}

export function useGetBrandDetail({ request }: UseGetBrandDetailProps) {
  return useQuery(
    brandQueryKey.getDetail(request ?? { id: -1 }),
    async () => {
      if (request === null) return null;
      return await brandApi.getDetail(request);
    },
    {
      onError: () => {
        toast("Lỗi gồi!");
      },
    },
  );
}
