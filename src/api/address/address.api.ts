import { BaseApi } from "../common/baseApi.api.ts";
import { City, District } from "./models";
import { addressUrl } from "./constants";
import { GetDetailCityRequest, GetDetailDistrictRequest } from "./requests";

class AddressApi extends BaseApi {
  async getListCity(): Promise<City[] | null> {
    return await this.tryGet<City[]>(addressUrl.getListCity, undefined);
  }

  async getDetailCity(request: GetDetailCityRequest): Promise<City | null> {
    return await this.tryGet<City>(
      addressUrl.getDetailCity(request.code),
      undefined,
    );
  }

  async getDetailDistrict(
    request: GetDetailDistrictRequest,
  ): Promise<District | null> {
    return await this.tryGet<District>(
      addressUrl.getDetailDistrict(request.code),
      undefined,
    );
  }
}

export const addressApi: AddressApi = new AddressApi();
