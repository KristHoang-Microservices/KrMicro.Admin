import { Brand } from "../../models";

export interface UpdateBrandStatusRequest
  extends Pick<Brand, "id" | "status"> {}
