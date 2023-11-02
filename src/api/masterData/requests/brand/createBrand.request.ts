import { Category } from "../../models";

export interface CreateBrandRequest
  extends Pick<Category, "name" | "imageUrl"> {}
