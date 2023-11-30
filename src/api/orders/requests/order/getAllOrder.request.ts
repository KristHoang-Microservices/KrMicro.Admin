import { Order } from "../../models";

export interface GetAllOrderRequest
  extends Partial<Pick<Order, "orderStatus" | "status">> {
  fromDate?: string;
  toDate?: string;
}
