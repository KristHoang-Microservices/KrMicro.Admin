import { Promo } from "../../models";

export interface CreatePromoRequest
  extends Pick<
    Promo,
    "name" | "code" | "value" | "promoUnit" | "startDate" | "endDate"
  > {}
