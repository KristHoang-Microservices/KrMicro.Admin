import { TableColumn } from "../models/tableColumn.ts";

export const brandTableColumns: TableColumn[] = [
  {
    id: 0,
    name: "id",
    display: "Id",
  },
  {
    id: 1,
    name: "brand",
    display: "Nhãn hiệu",
  },
  {
    id: 2,
    name: "status",
    display: "Trạng thái",
  },
  {
    id: 3,
    name: "createdAt",
    display: "Ngày tạo",
  },
  {
    id: 4,
    name: "updatedAt",
    display: "Ngày cập nhật",
  },
  {
    id: 5,
    name: "actions",
    display: "",
  },
];
