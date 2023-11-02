import { GetDetailProductRequest } from "../../../../api/masterData/requests/product";

export const getAll: string = "getAllCategories";
export const getDetail: (request: GetDetailProductRequest) => string = (
  request,
) => "getDetailCategory" + request.id;
