import { useMutation, useQueryClient } from "react-query";
import { brandApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { UpdateBrandStatusRequest } from "../../../../api/masterData/requests/brand";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { brandQueryKey } from "../constants";

interface UseUpdateBrandStatusProps {
  request: UpdateBrandStatusRequest | null;
}

export function useUpdateBrandStatus() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ request }: UseUpdateBrandStatusProps) => {
      if (request === null) return null;
      return brandApi.updateStatus(request, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi!");
      },
      onSuccess: () => {
        toast.success("Thành công nè!");
        queryClient.invalidateQueries([brandQueryKey.getAll]).then();
      },
    },
  );
}
