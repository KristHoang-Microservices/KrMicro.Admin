import { MenuItem } from "../models/menuItem.model.ts";
import {
  HiChartBar,
  HiColorSwatch,
  HiFolder,
  HiTable,
  HiTicket,
  HiUser,
} from "react-icons/hi";

export const menuList: MenuItem[] = [
  {
    name: "Quản lí Doanh thu",
    icon: HiChartBar,
    path: "/income",
  },
  {
    name: "Quản lí Đơn hàng",
    icon: HiFolder,
    path: "/orders",
  },
];
export const menuAdmin: MenuItem[] = [
  {
    name: "Quản lí Người dùng",
    icon: HiUser,
    path: "/users",
  },
  {
    name: "Quản lí Category",
    icon: HiTable,
    path: "/category",
  },
  {
    name: "Quản lí Sản phẩm",
    icon: HiFolder,
    path: "/products",
  },
  {
    name: "Quản lí Thương hiệu",
    icon: HiColorSwatch,
    path: "/brands",
  },
  {
    name: "Quản lí Giảm giá",
    icon: HiTicket,
    path: "/discount",
  },
];
