import { Product } from "../../models";

export interface GetDetailProductRequest extends Pick<Product, "id"> {}
