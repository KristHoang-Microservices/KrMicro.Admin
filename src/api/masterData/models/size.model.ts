import { Audit, Tracking } from "../../common/models";

export interface Size extends Tracking, Audit {
  id: number;
  sizeCode: string;
}
