import { Audit, Tracking } from "../../common/models";

export interface DeliveryInformation extends Audit, Tracking {
  id: number;
  name: string;
  fullAddress: string;
  phone: string;
  customerName: string;
  customerId: number;
}
