import { Category } from "../../models";

export interface GetDetailCategoryRequest extends Pick<Category, "id"> {}
