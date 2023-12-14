import { BaseApi } from "../common/baseApi.api.ts";
import { accountUrl } from "./constants";
import {
  CreateUserRequest,
  GetAllUsersRequest,
  GetDetailUserRequest,
  UpdateUserRequest,
} from "./requests/account";
import qs from "qs";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import { UserRole } from "./models/enums/UserRole.enum.ts";
import { GetUsersResponse } from "./responses/account/getUsersResponse.ts";

class AccountApi extends BaseApi {
  async getAll(
    request?: GetAllUsersRequest,
    accessToken?: string | null,
  ): Promise<ListResponseModel<GetUsersResponse> | null> {
    return await this.tryGet(accountUrl.GET_ALL, accessToken ?? undefined, {
      params: {
        ...request,
        role: request?.role ?? ["admin", "customer", "employee"],
      },
      paramsSerializer: (params) => qs.stringify(params),
    });
  }

  async getById(
    request?: GetDetailUserRequest,
    accessToken?: string,
  ): Promise<DetailResponse<GetUsersResponse> | null> {
    return accessToken !== undefined && request != undefined
      ? await this.tryGet(accountUrl.GET_BY_ID(request.id), accessToken)
      : null;
  }

  async create(request: CreateUserRequest): Promise<unknown | null> {
    const { role, ...rest } = request;
    if (role == UserRole.Admin)
      return await this.tryPost(accountUrl.SIGN_ADMIN, rest);
    if (role == UserRole.Employee)
      return await this.tryPost(accountUrl.SIGN_EMPLOYEE, rest);
  }

  async update(
    request: UpdateUserRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    const { id, ...rest } = request;
    return await this.tryPatch(accountUrl.UPDATE(id), rest, accessToken);
  }

  async delete(
    request: GetDetailUserRequest,
    accessToken?: string,
  ): Promise<boolean | null> {
    return await this.tryPatch(
      accountUrl.DELETE(request.id),
      undefined,
      accessToken,
    );
  }
}

export const accountApi: AccountApi = new AccountApi();
