import { Audit, Tracking } from "../../common/models";

export interface Category extends Tracking, Audit {
  [index: string]: string | number | undefined;

  id: number;
  name: string;
}
