import { TransactionStatus } from "../api/orders/models/enum";

export function getTransactionStatusName(status: TransactionStatus) {
  switch (status) {
    case TransactionStatus.Pending:
      return "Chờ phản hồi";
    case TransactionStatus.Success:
      return "Hoàn thành";
    case TransactionStatus.Failed:
      return "Thất bại";
    case TransactionStatus.Cancel:
      return "Hủy";
  }
}
