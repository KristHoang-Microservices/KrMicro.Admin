import { BaseApi } from "../common/baseApi.api.ts";
import { Category } from "./models";
import { categoryUrl } from "./constants";
import { ListResponseModel } from "../common/models";

class CategoryApi extends BaseApi {
  async getAll(): Promise<ListResponseModel<Category> | null> {
    return await this.tryGet<ListResponseModel<Category>>(categoryUrl.getAll);
  }

  // async getDetail(
  //   request: GetDetailProductRequest,
  // ): Promise<DetailResponse<Product> | null> {
  //   return await this.tryGet<DetailResponse<Product>>(
  //     productUrl.getDetail(request.id),
  //   );
  // }
  //
  // async create(
  //   request: CreateProductRequest,
  //   accessToken?: string,
  // ): Promise<DetailResponse<Product> | null> {
  //   return await this.tryPost<DetailResponse<Product>, CreateProductRequest>(
  //     productUrl.create,
  //     request,
  //     accessToken,
  //   );
  // }
  //
  // async updateStatus(
  //   request: UpdateProductStatusRequest,
  //   accessToken?: string,
  // ): Promise<MessageResponse | null> {
  //   if (accessToken === null) return null;
  //
  //   return await this.tryPost<
  //     MessageResponse,
  //     Omit<UpdateProductStatusRequest, "id">
  //   >(
  //     productUrl.updateStatus(request.id),
  //     { status: request.status },
  //     accessToken,
  //   );
  // }
}

export const categoryApi: CategoryApi = new CategoryApi();
