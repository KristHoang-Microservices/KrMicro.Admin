import { Category } from "../../models";

export interface UpdateCategoryRequest extends Partial<Pick<Category, "name">> {
  id: number;
}
