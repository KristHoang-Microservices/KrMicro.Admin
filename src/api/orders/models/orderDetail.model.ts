import { Audit, Tracking } from "../../common/models";

export interface OrderDetail extends Audit, Tracking {
  productId: number;
  orderId: number;
  sizeId: number;
  amount: number;
  sizeCode: string;
  price: number;
}
