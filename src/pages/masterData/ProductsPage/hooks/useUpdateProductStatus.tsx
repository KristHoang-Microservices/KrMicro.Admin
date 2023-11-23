import { useMutation, useQueryClient } from "react-query";
import { productApi } from "../../../../api/masterData";
import { toast } from "react-hot-toast";
import { UpdateProductStatusRequest } from "../../../../api/masterData/requests/product";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";
import { productQueryKey } from "../constants";
import { AxiosError } from "axios";
import { MessageResponse } from "../../../../api/common/models";

interface UseUpdateProductStatusProps {
  request: UpdateProductStatusRequest | null;
}

export function useUpdateProductStatus() {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  const queryClient = useQueryClient();

  return useMutation(
    async ({ request }: UseUpdateProductStatusProps) => {
      if (request === null) return null;
      return productApi.updateStatus(request, accessToken ?? undefined);
    },
    {
      onError: (error: AxiosError<MessageResponse>) => {
        toast.error(
          error.response?.data.message ??
            "Đã xảy ra lỗi khi cập nhật trạng thái",
        );
      },
      onSuccess: () => {
        toast.success("Thành công nè!");
        queryClient.invalidateQueries([productQueryKey.getAll]).then();
      },
    },
  );
}
