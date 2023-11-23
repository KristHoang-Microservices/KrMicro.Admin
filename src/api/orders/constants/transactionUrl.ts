import { TransactionStatus } from "../models/enum";
import { ordersBaseUrl } from "./ordersBaseUrl.ts";

const transactionBase: string = "/Transaction";

export const getAll: string = ordersBaseUrl(transactionBase);
export const getDetail: (id: number) => string = (id: number) =>
  ordersBaseUrl(transactionBase + `/${id}`);
export const getByOrderId: (orderId: number) => string = (orderId: number) =>
  ordersBaseUrl(transactionBase + `/Order/${orderId}`);
export const create: string = ordersBaseUrl(transactionBase);
export const update: (id: number) => string = (id: number) =>
  ordersBaseUrl(transactionBase + `/${id}`);
export const updateStatus: (id: number, status: TransactionStatus) => string = (
  id,
  status,
) => ordersBaseUrl(`${transactionBase}/${id}/${TransactionStatus[status]}`);
