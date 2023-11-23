import { TransactionStatus } from "../api/orders/models/enum";
import { BadgeProps } from "@nextui-org/react";

export function getTransactionStatusColor(
  status: TransactionStatus,
): BadgeProps["color"] {
  switch (status) {
    case TransactionStatus.Pending:
      return "default";
    case TransactionStatus.Success:
      return "success";
    case TransactionStatus.Failed:
      return "danger";
    case TransactionStatus.Cancel:
      return "warning";
  }
}
