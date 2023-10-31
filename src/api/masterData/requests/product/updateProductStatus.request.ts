import { Product } from "../../models";

export interface UpdateProductStatusRequest
  extends Pick<Product, "id" | "status"> {}
