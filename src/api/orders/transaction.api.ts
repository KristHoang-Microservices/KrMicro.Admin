import { BaseApi } from "../common/baseApi.api.ts";
import { Transaction } from "./models";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import { transactionUrl } from "./constants";
import {
  GetDetailTransactionRequest,
  GetTransactionByOrderIdRequest,
  UpdateTransactionStatusRequest,
} from "./requests/transaction";

class TransactionApi extends BaseApi {
  async getAll(): Promise<ListResponseModel<TransactionApi> | null> {
    return await this.tryGet<ListResponseModel<TransactionApi>>(
      transactionUrl.getAll,
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
  //   request: CreateTransactionRequest,
  //   accessToken?: string,
  // ): Promise<DetailResponse<Transaction> | null> {
  //   return await this.tryPost<DetailResponse<Transaction>, CreateTransactionRequest>(
  //     transactionUrl.create,
  //     request,
  //     accessToken,
  //   );
  // }
  //
  // async update(
  //   request: UpdateTransactionRequest,
  //   accessToken?: string,
  // ): Promise<DetailResponse<Transaction> | null> {
  //   return await this.tryPatch<DetailResponse<Transaction>, UpdateTransactionRequest>(
  //     transactionUrl.update(request.id),
  //     request,
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
