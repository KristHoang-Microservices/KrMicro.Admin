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
  GetDetailProductRequest,
  GetProductsByIdsRequest,
  UpdateProductRequest,
  UpdateProductStatusRequest,
  UpdateProductStockRequest,
} from "./requests/product";
import qs from "qs";

class ProductApi extends BaseApi {
  async getAll(): Promise<ListResponseModel<Product> | null> {
    return await this.tryGet<ListResponseModel<Product>>(productUrl.getAll);
  }

  async getByIds(
    request: GetProductsByIdsRequest,
  ): Promise<ListResponseModel<Product> | null> {
    return await this.tryGet<ListResponseModel<Product>>(
      productUrl.getByIds,
      undefined,
      {
        params: { ...request },
        paramsSerializer: (params) => qs.stringify(params),
      },
    );
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

  async update(
    request: UpdateProductRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Product> | null> {
    return await this.tryPatch<DetailResponse<Product>, UpdateProductRequest>(
      productUrl.update(request.id),
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

  async updateStock(
    request: UpdateProductStockRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    if (accessToken === null) return null;
    const { id, ...rest } = request;
    return await this.tryPost<
      MessageResponse,
      Omit<UpdateProductStockRequest, "id">
    >(productUrl.updateStock(id), rest, accessToken);
  }

  // async remove(
  //   requests: RemoveProductStatusRequest,
  //   accessToken?: string,
  // ): Promise<MessageResponse | null> {
  //   if (accessToken === null) return null;
  //
  //   return await this.tryPost<
  //     MessageResponse,
  //     Omit<UpdateProductStatusRequest, "id">
  //   >(
  //     productUrl.updateStatus(requests.id),
  //     { status: Status.Delete },
  //     accessToken,
  //   );
  // }
}

export const productApi: ProductApi = new ProductApi();
