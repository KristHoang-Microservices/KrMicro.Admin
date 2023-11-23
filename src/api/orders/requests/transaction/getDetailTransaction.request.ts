import { Transaction } from "../../models";

export interface GetDetailTransactionRequest extends Pick<Transaction, "id"> {}
