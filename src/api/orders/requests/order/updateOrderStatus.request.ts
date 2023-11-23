import { Order } from "../../models";

export interface UpdateOrderStatusRequest
  extends Pick<Order, "id" | "orderStatus"> {}
