import { OrderStatus } from "../api/orders/models/enum";

export function getNextOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Pending:
      return OrderStatus.Confirmed;
    case OrderStatus.Confirmed:
      return OrderStatus.Delivering;
    case OrderStatus.Delivering:
      return OrderStatus.Success;
    default:
      return OrderStatus.Cancelled;
  }
}
