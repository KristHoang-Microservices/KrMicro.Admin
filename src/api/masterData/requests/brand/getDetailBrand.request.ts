import { Brand } from "../../models";

export interface GetDetailBrandRequest extends Pick<Brand, "id"> {}
