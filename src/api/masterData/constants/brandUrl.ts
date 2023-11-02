import { masterDataUrl } from "./masterDataUrl.ts";

const brandBaseUrl: string = "/Brand";

export const getAll: string = masterDataUrl(brandBaseUrl);
export const getDetail: (id: number) => string = (id: number) =>
  masterDataUrl(brandBaseUrl + `/${id}`);
export const create: string = masterDataUrl(brandBaseUrl);
export const update: (id: number) => string = (id: number) =>
  masterDataUrl(brandBaseUrl + `/${id}`);
export const updateStatus: (id: number) => string = (id: number) =>
  masterDataUrl(brandBaseUrl + `/${id}/UpdateStatus`);
