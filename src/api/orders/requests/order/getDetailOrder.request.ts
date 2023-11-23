import { Order } from "../../models";

export interface GetDetailOrderRequest extends Pick<Order, "id"> {}
