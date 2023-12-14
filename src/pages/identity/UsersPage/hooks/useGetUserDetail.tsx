import { useQuery } from "react-query";
import { usersQueryKey } from "../constants/";
import { GetDetailUserRequest } from "../../../../api/identity/requests/account";
import { accountApi } from "../../../../api/identity/account.api.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";

interface UseGetUserDetailProps {
  request?: GetDetailUserRequest;
}

export function useGetUserDetail({ request }: UseGetUserDetailProps) {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  return useQuery(usersQueryKey.getDetail(request), async () => {
    return await accountApi.getById(request, accessToken ?? undefined);
  });
}
