import { identityUrl } from "./identityUrl.ts";

const authBaseUrl: string = "/Identity";

export const GET_ALL: string = identityUrl(authBaseUrl + "/GetAllUsers");
export const GET_BY_ID = (id: string) =>
  identityUrl(authBaseUrl + "/GetUserById/" + id);

export const UPDATE = (id: string) =>
  identityUrl(authBaseUrl + "/UpdateUserProfile/" + id);

export const DELETE = (id: string) =>
  identityUrl(authBaseUrl + "/DeleteUser/" + id);

export const SIGN_ADMIN = identityUrl(authBaseUrl + "/SignUpAdmin");

export const SIGN_EMPLOYEE = identityUrl(authBaseUrl + "/SignUpEmployee");
