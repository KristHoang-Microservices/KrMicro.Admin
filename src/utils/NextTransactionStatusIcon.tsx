import { TransactionStatus } from "../api/orders/models/enum";
import { HiOutlineCheckCircle, HiOutlineEmojiHappy, HiX } from "react-icons/hi";

export function NextTransactionStatusIcon(status: TransactionStatus) {
  switch (status) {
    case TransactionStatus.Pending:
      return <HiOutlineCheckCircle />;
    case TransactionStatus.Success:
      return <HiOutlineEmojiHappy />;
    default:
      return <HiX />;
  }
}
