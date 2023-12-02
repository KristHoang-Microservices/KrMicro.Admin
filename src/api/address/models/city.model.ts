import { District } from "./district.model.ts";

export interface City {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}
