import { TransactionStatus } from "../api/orders/models/enum";

export function getNextTransactionStatus(status: TransactionStatus) {
  switch (status) {
    case TransactionStatus.Pending:
      return TransactionStatus.Success;
    default:
      return TransactionStatus.Cancel;
  }
}
