import { identityUrl } from "./identityUrl.ts";

const authBaseUrl: string = "/Identity";

export const loginUrl: string = identityUrl(authBaseUrl + "/Login");
