import { GetDetailProductRequest } from "../../../../api/masterData/requests/product";

export const getAll: string = "getAllPromos";
export const getDetail: (request: GetDetailProductRequest) => string = (
  request,
) => "getDetailPromo" + request.id;
