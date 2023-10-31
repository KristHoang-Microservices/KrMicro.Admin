import { masterDataUrl } from "./masterDataUrl.ts";

const categoryBaseUrl: string = "/Category";

export const getAll: string = masterDataUrl(categoryBaseUrl);
export const getDetail: (id: number) => string = (id: number) =>
  masterDataUrl(categoryBaseUrl + `/${id}`);
export const create: string = masterDataUrl(categoryBaseUrl);

export const updateStatus: (id: number) => string = (id: number) =>
  masterDataUrl(categoryBaseUrl + `/${id}/UpdateStatus`);
