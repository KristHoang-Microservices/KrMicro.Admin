import { Category } from "../../models";

export interface UpdateCategoryStatusRequest
  extends Pick<Category, "id" | "status"> {}
