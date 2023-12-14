import { BaseApi } from "../common/baseApi.api.ts";
import { Promo } from "./models/";
import { promoUrl } from "./constants";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import {
  CreatePromoRequest,
  GetDetailPromoRequest,
  UpdatePromoRequest,
  UpdatePromoStatusRequest,
} from "./requests/promo";

class PromoApi extends BaseApi {
  async getAll(): Promise<ListResponseModel<Promo> | null> {
    return await this.tryGet<ListResponseModel<Promo>>(promoUrl.GET_ALL);
  }

  async getDetail(
    request: GetDetailPromoRequest,
  ): Promise<DetailResponse<Promo> | null> {
    return await this.tryGet<DetailResponse<Promo>>(
      promoUrl.GET_DETAIL_BY_ID(request.id),
    );
  }

  async create(
    request: CreatePromoRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Promo> | null> {
    return await this.tryPost<DetailResponse<Promo>, CreatePromoRequest>(
      promoUrl.CREATE,
      request,
      accessToken,
    );
  }

  async update(
    request: UpdatePromoRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Promo> | null> {
    return await this.tryPatch<DetailResponse<Promo>, UpdatePromoRequest>(
      promoUrl.UPDATE(request.id),
      request,
      accessToken,
    );
  }

  async updateStatus(
    request: UpdatePromoStatusRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    if (accessToken === null) return null;

    return await this.tryPost<
      MessageResponse,
      Omit<UpdatePromoStatusRequest, "id">
    >(
      promoUrl.UPDATE_STATUS(request.id),
      { status: request.status },
      accessToken,
    );
  }
}

export const promoApi: PromoApi = new PromoApi();
