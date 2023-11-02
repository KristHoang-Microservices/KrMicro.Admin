import { Category } from "../../models";

export interface CreateCategoryRequest extends Pick<Category, "name"> {}
