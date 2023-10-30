import { Audit, Tracking } from "../../common/models";
import { Size } from "./size.model.ts";

export interface ProductSize extends Tracking, Audit {
  id: number;

  sizeId: number;
  productId: number;

  stock: number;
  price: number;

  size: Size;
}
