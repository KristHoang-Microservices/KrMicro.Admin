import { GetDetailBrandRequest } from "../../../../api/masterData/requests/brand";

export const getAll: string = "getAllBrands";
export const getDetail: (request: GetDetailBrandRequest) => string = (
  request,
) => "getDetailBrand" + request.id;
