import { Promo } from "../../models";

export interface GetDetailPromoRequest extends Pick<Promo, "id"> {}
