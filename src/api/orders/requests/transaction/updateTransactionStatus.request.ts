import { Transaction } from "../../models";

export interface UpdateTransactionStatusRequest
  extends Pick<Transaction, "transactionStatus" | "id"> {}
