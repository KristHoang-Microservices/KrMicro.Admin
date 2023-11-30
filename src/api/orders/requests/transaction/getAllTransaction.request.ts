import { Transaction } from "../../models";

export interface GetAllTransactionRequest
  extends Partial<Pick<Transaction, "transactionStatus" | "status">> {
  fromDate?: string;
  toDate?: string;
}
