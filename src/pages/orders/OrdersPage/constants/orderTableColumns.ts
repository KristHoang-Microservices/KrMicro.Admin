import { TableColumn } from "../models/tableColumn.ts";

export const orderTableColumns: TableColumn[] = [
  {
    id: 0,
    name: "id",
    display: "Id",
  },
  {
    id: 1,
    name: "customer",
    display: "Khách hàng",
  },
  {
    id: 2,
    name: "total",
    display: "Tổng giá trị",
  },
  {
    id: 3,
    name: "orderStatus",
    display: "Trạng thái đơn",
  },
  {
    id: 4,
    name: "transactions",
    display: "Thanh toán",
  },
  {
    id: 5,
    name: "createdAt",
    display: "Ngày tạo",
  },
  {
    id: 6,
    name: "updatedAt",
    display: "Ngày cập nhật",
  },
  {
    id: 7,
    name: "actions",
    display: "",
  },
];
