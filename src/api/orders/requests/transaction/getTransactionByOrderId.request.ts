import { Transaction } from "../../models";

export interface GetTransactionByOrderIdRequest
  extends Pick<Transaction, "orderId"> {}
