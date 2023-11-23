import { Audit, Tracking } from "../../common/models";
import { PaymentMethod } from "./paymentMethod.model.ts";
import { TransactionStatus } from "./enum";

export interface Transaction extends Audit, Tracking {
  id: number;
  customerId: number;
  phoneNumber: string;
  orderId: number;
  paymentMethodId: number;
  paymentMethod: PaymentMethod;
  transactionStatus: TransactionStatus;
  total: number;
}
