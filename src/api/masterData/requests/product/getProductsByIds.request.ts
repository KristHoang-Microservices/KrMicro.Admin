import { Product } from "../../models";

export interface GetProductsByIdsRequest {
  ids: Product["id"][];
}
