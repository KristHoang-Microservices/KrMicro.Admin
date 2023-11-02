import { BaseApi } from "../common/baseApi.api.ts";
import { Brand } from "./models";
import { brandUrl } from "./constants";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import {
  CreateBrandRequest,
  GetDetailBrandRequest,
  UpdateBrandRequest,
  UpdateBrandStatusRequest,
} from "./requests/brand";

class BrandApi extends BaseApi {
  async getAll(): Promise<ListResponseModel<Brand> | null> {
    return await this.tryGet<ListResponseModel<Brand>>(brandUrl.getAll);
  }

  async getDetail(
    request: GetDetailBrandRequest,
  ): Promise<DetailResponse<Brand> | null> {
    return await this.tryGet<DetailResponse<Brand>>(
      brandUrl.getDetail(request.id),
    );
  }

  async create(
    request: CreateBrandRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Brand> | null> {
    return await this.tryPost<DetailResponse<Brand>, CreateBrandRequest>(
      brandUrl.create,
      request,
      accessToken,
    );
  }

  async update(
    request: UpdateBrandRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Brand> | null> {
    return await this.tryPatch<DetailResponse<Brand>, UpdateBrandRequest>(
      brandUrl.update(request.id),
      request,
      accessToken,
    );
  }

  async updateStatus(
    request: UpdateBrandStatusRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    if (accessToken === null) return null;

    return await this.tryPost<
      MessageResponse,
      Omit<UpdateBrandStatusRequest, "id">
    >(
      brandUrl.updateStatus(request.id),
      { status: request.status },
      accessToken,
    );
  }
}

export const brandApi: BrandApi = new BrandApi();
