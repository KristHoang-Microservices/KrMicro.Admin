import { useMutation } from "react-query";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { UpdateProductStatusRequest } from "../../../../api/masterData/requests/product";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";

interface UseUpdateProductStatusProps {
  request: UpdateProductStatusRequest | null;
}

export function useUpdateProductStatus() {
  const accessToken: string | null = useAppSelector(selectAccessToken);

  return useMutation(
    async ({ request }: UseUpdateProductStatusProps) => {
      if (request === null) return null;
      return productApi.updateStatus(request, accessToken ?? undefined);
    },
    {
      onError: () => {
        toast.error("Lỗi gồi!");
      },
      onSuccess: () => {
        toast.success("Thành công nè!");
      },
    },
  );
}
