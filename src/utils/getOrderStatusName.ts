import { OrderStatus } from "../api/orders/models/enum";

export function getOrderStatusName(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Pending:
      return "Chờ phản hồi";
    case OrderStatus.Confirmed:
      return "Đã xác nhận";
    case OrderStatus.Delivering:
      return "Giao hàng";
    case OrderStatus.Returned:
      return "Trả hàng";
    case OrderStatus.Success:
      return "Hoàn thành";
    case OrderStatus.Cancelled:
      return "Hủy";
  }
}
