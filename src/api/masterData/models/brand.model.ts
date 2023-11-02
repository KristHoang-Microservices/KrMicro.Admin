import { Audit, Tracking } from "../../common/models";

export interface Brand extends Audit, Tracking {
  [index: string]: string | number | undefined;

  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}
