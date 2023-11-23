import { OrderStatus } from "../models/enum";
import { ordersBaseUrl } from "./ordersBaseUrl.ts";

const orderUrl = ordersBaseUrl;
const orderBaseUrl: string = "/Order";

export const getAll: string = orderUrl(orderBaseUrl);
export const getDetail: (id: number) => string = (id: number) =>
  orderUrl(orderBaseUrl + `/${id}`);
export const create: string = orderUrl(orderBaseUrl);
export const update: (id: number) => string = (id: number) =>
  orderUrl(orderBaseUrl + `/${id}`);
export const updateStatus: (id: number, status: OrderStatus) => string = (
  id,
  status,
) => orderUrl(`${orderBaseUrl}/${id}/${OrderStatus[status]}`);
