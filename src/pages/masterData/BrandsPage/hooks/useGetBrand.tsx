import { useQuery } from "react-query";
import { brandQueryKey } from "../constants/";
import { brandApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";

export function useGetBrand() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  return useQuery(
    brandQueryKey.getAll,
    async () => {
      const res = await brandApi.getAll({
        accessToken: accessToken ?? undefined,
      });
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
