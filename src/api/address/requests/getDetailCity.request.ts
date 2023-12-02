import { City } from "../models";

export interface GetDetailCityRequest {
  code: City["code"];
}
