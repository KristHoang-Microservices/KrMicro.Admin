import { BaseApi } from "../common/baseApi.api.ts";
import { Order } from "./models";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import { orderUrl } from "./constants";
import {
  CreateOrderRequest,
  GetAllOrderRequest,
  GetDetailOrderRequest,
  UpdateOrderRequest,
  UpdateOrderStatusRequest,
} from "./requests/order";
import qs from "qs";

class OrdersApi extends BaseApi {
  async getAll(
    request?: GetAllOrderRequest,
  ): Promise<ListResponseModel<Order> | null> {
    return await this.tryGet<ListResponseModel<Order>>(
      orderUrl.getAll,
      undefined,
      {
        params: request,
        paramsSerializer: (params) => qs.stringify(params),
      },
    );
  }

  async getDetail(
    request: GetDetailOrderRequest,
  ): Promise<DetailResponse<Order> | null> {
    return await this.tryGet<DetailResponse<Order>>(
      orderUrl.getDetail(request.id),
    );
  }

  async create(
    request: CreateOrderRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Order> | null> {
    return await this.tryPost<DetailResponse<Order>, CreateOrderRequest>(
      orderUrl.create,
      request,
      accessToken,
    );
  }

  async update(
    request: UpdateOrderRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Order> | null> {
    return await this.tryPatch<DetailResponse<Order>, UpdateOrderRequest>(
      orderUrl.update(request.id),
      request,
      accessToken,
    );
  }

  async updateStatus(
    request: UpdateOrderStatusRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    if (accessToken === null) return null;

    return await this.tryPost<MessageResponse, undefined>(
      orderUrl.updateStatus(request.id, request.orderStatus),
      undefined,
      accessToken,
    );
  }
}

export const orderApi: OrdersApi = new OrdersApi();
