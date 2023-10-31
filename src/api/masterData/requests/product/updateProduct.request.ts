import { Product } from "../../models";

export interface UpdateProductRequest
  extends Partial<
    Pick<
      Product,
      | "name"
      | "description"
      | "imageUrls"
      | "importFrom"
      | "releaseYear"
      | "fragranceDescription"
      | "style"
    >
  > {
  id: number;
  brandName?: string;
  categoryName?: string;
}
