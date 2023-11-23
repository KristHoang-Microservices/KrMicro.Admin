import { Audit, Tracking } from "../../common/models";
import { OrderStatus } from "./enum";
import { OrderDetail } from "./orderDetail.model.ts";
import { DeliveryInformation } from "./deliveryInformation.model.ts";
import { Transaction } from "./transaction.model.ts";

export interface Order extends Audit, Tracking {
  [index: string]:
    | string
    | number
    | undefined
    | unknown[]
    | DeliveryInformation;

  id: number;
  orderData: string;
  total: number;
  orderStatus: OrderStatus;
  deliveryInformationId: number;
  deliveryInformation: DeliveryInformation;
  note?: string;
  orderDetails: OrderDetail[];
  transactions: Transaction[];
}
