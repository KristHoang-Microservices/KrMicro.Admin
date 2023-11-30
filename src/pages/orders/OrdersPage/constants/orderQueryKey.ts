import {
  GetAllOrderRequest,
  GetDetailOrderRequest,
} from "../../../../api/orders/requests/order";
import qs from "qs";

export const getAll: (request?: GetAllOrderRequest) => string = (request) =>
  "getAllOrders" + qs.stringify(request);
export const getDetail: (request: GetDetailOrderRequest) => string = (
  request,
) => "getDetailOrders" + request.id;
