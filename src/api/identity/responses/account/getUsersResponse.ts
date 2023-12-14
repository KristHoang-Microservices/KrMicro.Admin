import { UserModel } from "../../models";

export interface GetUsersResponse {
  user: UserModel;
  role: string;
}
