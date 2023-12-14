import { TableColumn } from "../models/tableColumn.ts";

export const userTableColumns: TableColumn[] = [
  {
    id: 0,
    name: "id",
    display: "Id",
  },
  {
    id: 1,
    name: "user",
    display: "Người dùng",
  },
  {
    id: 2,
    name: "email",
    display: "Email",
  },
  {
    id: 3,
    name: "phoneNumber",
    display: "SĐT",
  },
  {
    id: 4,
    name: "role",
    display: "Vai trò",
  },
  {
    id: 5,
    name: "actions",
    display: "",
  },
];
