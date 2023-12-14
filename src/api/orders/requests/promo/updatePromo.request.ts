import { CreatePromoRequest } from "./createPromo.request.ts";

export interface UpdatePromoRequest extends Partial<CreatePromoRequest> {
  id: number;
}
