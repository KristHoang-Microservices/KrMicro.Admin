import { GetDetailProductRequest } from "../../../../api/masterData/requests/product/getDetailProduct.request.ts";

export const getAll: string = "getAllProducts";
export const getDetail: (request: GetDetailProductRequest) => string = (
  request,
) => "getDetailProduct" + request.id;
