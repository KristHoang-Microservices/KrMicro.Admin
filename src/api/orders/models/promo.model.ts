import { Audit, Tracking } from "../../common/models";
import { PromoUnit } from "./enum";

export interface Promo extends Audit, Tracking {
  [index: string]: string | number | undefined;

  id: number;
  name: string;
  code: string;
  value: number;
  promoUnit: PromoUnit;
  startDate: string;
  endDate: string;
}
