import { BaseApi } from "../common/baseApi.api.ts";
import { LoginRequest } from "./requests/LoginRequest";
import { LoginResponse } from "./responses/LoginResponse.ts";
import { authUrl } from "./constants";

class IdentityApi extends BaseApi {
  async login(request: LoginRequest): Promise<LoginResponse | null> {
    return await this.tryPost(authUrl.loginUrl, {
      ...request,
    });
  }
}

export const identityApi: IdentityApi = new IdentityApi();
