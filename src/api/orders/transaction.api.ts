import { BaseApi } from "../common/baseApi.api.ts";
import { Transaction } from "./models";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import { transactionUrl } from "./constants";
import {
  GetAllTransactionRequest,
  GetDetailTransactionRequest,
  GetTransactionByOrderIdRequest,
  UpdateTransactionStatusRequest,
} from "./requests/transaction";
import qs from "qs";

class TransactionApi extends BaseApi {
  async getAll(
    request?: GetAllTransactionRequest,
  ): Promise<ListResponseModel<Transaction> | null> {
    return await this.tryGet<ListResponseModel<Transaction>>(
      transactionUrl.getAll,
      undefined,
      {
        params: request,
        paramsSerializer: (params) => qs.stringify(params),
      },
    );
  }

  async getDetail(
    request: GetDetailTransactionRequest,
  ): Promise<DetailResponse<Transaction> | null> {
    return await this.tryGet<DetailResponse<Transaction>>(
      transactionUrl.getDetail(request.id),
    );
  }

  async getByOrderId(
    request: GetTransactionByOrderIdRequest,
    accessToken?: string,
  ): Promise<ListResponseModel<Transaction> | null> {
    return await this.tryGet<ListResponseModel<Transaction>>(
      transactionUrl.getByOrderId(request.orderId),
      accessToken,
    );
  }

  //
  // async create(
  //   requests: CreateTransactionRequest,
  //   accessToken?: string,
  // ): Promise<DetailResponse<Transaction> | null> {
  //   return await this.tryPost<DetailResponse<Transaction>, CreateTransactionRequest>(
  //     transactionUrl.create,
  //     requests,
  //     accessToken,
  //   );
  // }
  //
  // async update(
  //   requests: UpdateTransactionRequest,
  //   accessToken?: string,
  // ): Promise<DetailResponse<Transaction> | null> {
  //   return await this.tryPatch<DetailResponse<Transaction>, UpdateTransactionRequest>(
  //     transactionUrl.update(requests.id),
  //     requests,
  //     accessToken,
  //   );
  // }

  async updateStatus(
    request: UpdateTransactionStatusRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    if (accessToken === null) return null;

    return await this.tryPost<MessageResponse, undefined>(
      transactionUrl.updateStatus(request.id, request.transactionStatus),
      undefined,
      accessToken,
    );
  }
}

export const transactionApi: TransactionApi = new TransactionApi();
