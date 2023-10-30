import { Product } from "../../models";

export interface CreateProductRequest
  extends Pick<
    Product,
    | "name"
    | "description"
    | "imageUrls"
    | "importFrom"
    | "releaseYear"
    | "fragranceDescription"
    | "style"
  > {
  brandName: string;
  categoryName: string;
}
