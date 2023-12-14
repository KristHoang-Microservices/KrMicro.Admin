import { useQuery } from "react-query";
import { usersQueryKey } from "../constants/";
import { GetAllUsersRequest } from "../../../../api/identity/requests/account";
import { accountApi } from "../../../../api/identity/account.api.ts";
import { useAppSelector } from "../../../../app/hooks.ts";
import { selectAccessToken } from "../../../../features/identity/identity.slice.ts";

export function useGetUsers(request?: GetAllUsersRequest) {
  const accessToken: string | null = useAppSelector(selectAccessToken);
  return useQuery(usersQueryKey.getAll, async () => {
    const res = await accountApi.getAll(request, accessToken);
    const data = res?.listData ?? [];
    return { ...res, listData: data };
  });
}
