import { TableColumn } from "../models/tableColumn.ts";

export const productTableColumns: TableColumn[] = [
  {
    id: 0,
    name: "id",
    display: "Id",
  },
  {
    id: 1,
    name: "product",
    display: "Sản phẩm",
  },
  {
    id: 2,
    name: "importFrom",
    display: "Nhập từ",
  },
  {
    id: 3,
    name: "releaseYear",
    display: "Năm",
  },
  {
    id: 4,
    name: "style",
    display: "Phong cách",
  },
  {
    id: 5,
    name: "fragranceDescription",
    display: "Hương thơm",
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
    name: "size",
    display: "Kích thước",
  },
  {
    id: 10,
    name: "actions",
    display: "",
  },
];
