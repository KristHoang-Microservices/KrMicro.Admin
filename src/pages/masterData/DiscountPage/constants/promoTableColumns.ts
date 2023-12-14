import { TableColumn } from "../models/tableColumn.ts";

export const promoTableColumns: TableColumn[] = [
  {
    id: 0,
    name: "id",
    display: "Id",
  },
  {
    id: 1,
    name: "promo",
    display: "Mã giảm giá",
  },
  {
    id: 2,
    name: "value",
    display: "Giá trị",
  },
  {
    id: 3,
    name: "promoUnit",
    display: "Loại",
  },
  {
    id: 4,
    name: "startDate",
    display: "Ngày bắt đầu",
  },
  {
    id: 5,
    name: "endDate",
    display: "Ngày kết thúc",
  },
  {
    id: 6,
    name: "status",
    display: "Trạng thái",
  },
  {
    id: 7,
    name: "createdAt",
    display: "Ngày tạo",
  },
  {
    id: 8,
    name: "updatedAt",
    display: "Ngày cập nhật",
  },
  {
    id: 9,
    name: "actions",
    display: "",
  },
];
