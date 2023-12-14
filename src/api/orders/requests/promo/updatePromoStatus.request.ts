import { Promo } from "../../models";

export interface UpdatePromoStatusRequest
  extends Pick<Promo, "id" | "status"> {}
