import { BaseApi } from "../common/baseApi.api.ts";
import { loginUrl } from "./constants";
import { LoginRequest } from "./requests/LoginRequest";
import { LoginResponse } from "./responses/LoginResponse.ts";

class IdentityApi extends BaseApi {
  async login(request: LoginRequest): Promise<LoginResponse | null> {
    return await this.tryPost(loginUrl, {
      ...request,
    });
  }
}

export const identityApi: IdentityApi = new IdentityApi();
