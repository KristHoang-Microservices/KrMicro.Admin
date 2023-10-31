import { Audit, Tracking } from "../../common/models";

export interface Category extends Tracking, Audit {
  id: number;
  name: string;
  imageUrl: string;
}
