import { GetDetailOrderRequest } from "../../../../api/orders/requests/order";
import { GetTransactionByOrderIdRequest } from "../../../../api/orders/requests/transaction";

export const getAll: string = "getAllTransaction";
export const getByOrderId = (request: GetTransactionByOrderIdRequest) =>
  "getTransactionsByOrderId" + request.orderId;
export const getDetail: (request: GetDetailOrderRequest) => string = (
  request,
) => "getDetailOrders" + request.id;
