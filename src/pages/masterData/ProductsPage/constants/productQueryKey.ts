import { GetDetailProductRequest } from "../../../../api/masterData/requests/product";

export const getAll: string = "getAllProducts";
export const getByIds = (ids: number[]) =>
  "getAllProductsByIds" + ids.toString();
export const getDetail: (request: GetDetailProductRequest) => string = (
  request,
) => "getDetailProduct" + request.id;
