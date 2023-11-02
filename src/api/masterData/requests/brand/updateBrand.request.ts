import { Brand } from "../../models";

export interface UpdateBrandRequest
  extends Partial<Pick<Brand, "name" | "imageUrl">> {
  id: number;
}
