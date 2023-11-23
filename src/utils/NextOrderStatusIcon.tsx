import { OrderStatus } from "../api/orders/models/enum";
import {
  HiOutlineCheckCircle,
  HiOutlineEmojiHappy,
  HiOutlineTruck,
  HiX,
} from "react-icons/hi";

export function NextOrderStatusIcon(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Pending:
      return <HiOutlineCheckCircle />;
    case OrderStatus.Confirmed:
      return <HiOutlineTruck />;
    case OrderStatus.Delivering:
      return <HiOutlineEmojiHappy />;
    default:
      return <HiX />;
  }
}
