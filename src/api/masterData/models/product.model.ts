import { Brand, Category, ProductSize } from "../models";
import { Status } from "../../../models/status.enum.ts";

export interface Product {
  [index: string]: string | number | Brand | Category | unknown[];

  id: number;
  name: string;

  brandId: number;
  brand: Brand;
  categoryId: number;
  category: Category;

  importFrom: string;
  releaseYear: string;

  imageUrls: string;
  description: string;
  style: string;
  fragranceDescription: string;

  productSizes: ProductSize[];

  status: Status;
}
