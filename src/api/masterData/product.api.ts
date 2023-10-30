import { BaseApi } from "../common/baseApi.api.ts";
import { Product } from "./models";
import { productUrl } from "./constants";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import {
  CreateProductRequest,
  UpdateProductStatusRequest,
} from "./requests/product";
import { GetDetailProductRequest } from "./requests/product/getDetailProduct.request.ts";

class ProductApi extends BaseApi {
  async getAll(): Promise<ListResponseModel<Product> | null> {
    return await this.tryGet<ListResponseModel<Product>>(productUrl.getAll);
  }

  async getDetail(
    request: GetDetailProductRequest,
  ): Promise<DetailResponse<Product> | null> {
    return await this.tryGet<DetailResponse<Product>>(
      productUrl.getDetail(request.id),
    );
  }

  async create(
    request: CreateProductRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Product> | null> {
    return await this.tryPost<DetailResponse<Product>, CreateProductRequest>(
      productUrl.create,
      request,
      accessToken,
    );
  }

  async updateStatus(
    request: UpdateProductStatusRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    if (accessToken === null) return null;

    return await this.tryPost<
      MessageResponse,
      Omit<UpdateProductStatusRequest, "id">
    >(
      productUrl.updateStatus(request.id),
      { status: request.status },
      accessToken,
    );
  }
}

export const productApi: ProductApi = new ProductApi();
