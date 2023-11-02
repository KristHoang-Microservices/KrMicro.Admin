import { BaseApi } from "../common/baseApi.api.ts";
import { Category } from "./models";
import { categoryUrl } from "./constants";
import {
  DetailResponse,
  ListResponseModel,
  MessageResponse,
} from "../common/models";
import {
  CreateCategoryRequest,
  GetDetailCategoryRequest,
  UpdateCategoryRequest,
  UpdateCategoryStatusRequest,
} from "./requests/category";

class CategoryApi extends BaseApi {
  async getAll(): Promise<ListResponseModel<Category> | null> {
    return await this.tryGet<ListResponseModel<Category>>(categoryUrl.getAll);
  }

  async getDetail(
    request: GetDetailCategoryRequest,
  ): Promise<DetailResponse<Category> | null> {
    return await this.tryGet<DetailResponse<Category>>(
      categoryUrl.getDetail(request.id),
    );
  }

  async create(
    request: CreateCategoryRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Category> | null> {
    return await this.tryPost<DetailResponse<Category>, CreateCategoryRequest>(
      categoryUrl.create,
      request,
      accessToken,
    );
  }

  async update(
    request: UpdateCategoryRequest,
    accessToken?: string,
  ): Promise<DetailResponse<Category> | null> {
    return await this.tryPatch<DetailResponse<Category>, UpdateCategoryRequest>(
      categoryUrl.update(request.id),
      request,
      accessToken,
    );
  }

  async updateStatus(
    request: UpdateCategoryStatusRequest,
    accessToken?: string,
  ): Promise<MessageResponse | null> {
    if (accessToken === null) return null;

    return await this.tryPost<
      MessageResponse,
      Omit<UpdateCategoryStatusRequest, "id">
    >(
      categoryUrl.updateStatus(request.id),
      { status: request.status },
      accessToken,
    );
  }
}

export const categoryApi: CategoryApi = new CategoryApi();
