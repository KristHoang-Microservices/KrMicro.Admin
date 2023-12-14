import { GetDetailUserRequest } from "../../../../api/identity/requests/account";

export const getAll = "getAllUsers";
export const getDetail: (request?: GetDetailUserRequest) => string = (
  request,
) => "getDetailUsers" + request?.id;
