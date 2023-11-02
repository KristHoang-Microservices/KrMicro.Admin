import { masterDataUrl } from "./masterDataUrl.ts";

const productBaseUrl: string = "/Product";

export const getAll: string = masterDataUrl(productBaseUrl);
export const getDetail: (id: number) => string = (id: number) =>
  masterDataUrl(productBaseUrl + `/${id}`);
export const create: string = masterDataUrl(productBaseUrl);
export const update: (id: number) => string = (id: number) =>
  masterDataUrl(productBaseUrl + `/${id}`);
export const updateStatus: (id: number) => string = (id: number) =>
  masterDataUrl(productBaseUrl + `/${id}/UpdateStatus`);

export const updateStock: (id: number) => string = (id: number) =>
  masterDataUrl(productBaseUrl + `/${id}/UpdateStock`);
