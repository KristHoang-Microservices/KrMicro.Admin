import { GetDetailOrderRequest } from "../../../../api/orders/requests/order";

export const getAll: string = "getAllOrders";
export const getDetail: (request: GetDetailOrderRequest) => string = (
  request,
) => "getDetailOrders" + request.id;
