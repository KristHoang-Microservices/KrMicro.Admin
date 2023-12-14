import { TableColumn } from "../models/tableColumn.ts";

export const transactionTableColumns: TableColumn[] = [
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
    name: "transactionStatus",
    display: "Trạng thái thanh toán",
  },
  {
    id: 4,
    name: "transactionType",
    display: "Loại",
  },
  {
    id: 5,
    name: "order",
    display: "Đơn hàng",
  },
  {
    id: 6,
    name: "createdAt",
    display: "Ngày tạo",
  },
  {
    id: 7,
    name: "updatedAt",
    display: "Ngày cập nhật",
  },
  // {
  //   id: 7,
  //   name: "actions",
  //   display: "",
  // },
];
