import { GetDetailProductRequest } from "../../../../api/masterData/requests/product";

export const getAll: string = "getAllProducts";
export const getDetail: (request: GetDetailProductRequest) => string = (
  request,
) => "getDetailProduct" + request.id;
