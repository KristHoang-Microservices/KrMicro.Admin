import { Audit, Tracking } from "../../common/models";

export interface PaymentMethod extends Audit, Tracking {
  id: number;
  name: string;
  description: string;
}
