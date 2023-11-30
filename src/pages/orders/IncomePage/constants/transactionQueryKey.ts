import { GetDetailOrderRequest } from "../../../../api/orders/requests/order";
import {
  GetAllTransactionRequest,
  GetTransactionByOrderIdRequest,
} from "../../../../api/orders/requests/transaction";
import qs from "qs";

export const getAll: (request?: GetAllTransactionRequest) => string = (
  request,
) => "getAllTransaction" + qs.stringify(request);
export const getByOrderId = (request: GetTransactionByOrderIdRequest) =>
  "getTransactionsByOrderId" + request.orderId;
export const getDetail: (request: GetDetailOrderRequest) => string = (
  request,
) => "getDetailOrders" + request.id;
