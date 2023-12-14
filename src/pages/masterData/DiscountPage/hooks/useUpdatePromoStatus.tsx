import { useMutation, useQueryClient } from "react-query";
import { promoApi } from "../../../../api/orders";
import { toast } from "react-hot-toast";
import { UpdatePromoStatusRequest } from "../../../../api/orders/requests/promo";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { promoQueryKey } from "../constants";
import { AxiosError } from "axios";
import { MessageResponse } from "../../../../api/common/models";

interface UseUpdatePromoStatusProps {
  request: UpdatePromoStatusRequest | null;
}

export function useUpdatePromoStatus() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ request }: UseUpdatePromoStatusProps) => {
      if (request === null) return null;
      return promoApi.updateStatus(request, accessToken ?? undefined);
    },
    {
      onError: (error: AxiosError<MessageResponse>) => {
        toast.error(
          error.response?.data.message ??
            "Đã xảy ra lỗi khi cập nhật trạng thái",
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries([promoQueryKey.getAll]).then();
        toast.success("Thành công nè!");
      },
    },
  );
}
