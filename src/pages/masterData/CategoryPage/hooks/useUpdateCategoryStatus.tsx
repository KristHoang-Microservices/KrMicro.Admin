import { useMutation, useQueryClient } from "react-query";
import { categoryApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { UpdateCategoryStatusRequest } from "../../../../api/masterData/requests/category";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { categoryQueryKey } from "../constants";

interface UseUpdateCategoryStatusProps {
  request: UpdateCategoryStatusRequest | null;
}

export function useUpdateCategoryStatus() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ request }: UseUpdateCategoryStatusProps) => {
      if (request === null) return null;
      return categoryApi.updateStatus(request, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi!");
      },
      onSuccess: () => {
        toast.success("Thành công nè!");
        queryClient.invalidateQueries([categoryQueryKey.getAll]).then();
      },
    },
  );
}
