import { Product } from "../../models";

interface StockUpdate {
  sizeCode: string;
  stock: number;
  price: number;
}

export interface UpdateProductStockRequest {
  id: Product["id"];
  productSizes: StockUpdate[];
}
