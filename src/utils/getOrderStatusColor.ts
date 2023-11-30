import { OrderStatus } from "../api/orders/models/enum";
import { BadgeProps } from "@nextui-org/react";

export function getOrderStatusColor(status: OrderStatus): BadgeProps["color"] {
  switch (status) {
    case OrderStatus.Pending:
      return "default";
    case OrderStatus.Confirmed:
      return "secondary";
    case OrderStatus.Delivering:
      return "primary";
    case OrderStatus.Returned:
      return "warning";
    case OrderStatus.Success:
      return "success";
    case OrderStatus.Cancelled:
      return "danger";
  }
}
