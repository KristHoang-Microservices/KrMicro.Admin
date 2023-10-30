import { menuAdmin, menuList } from "../constants/menuList.ts";
import { MenuItem } from "../models/menuItem.model.ts";

export function getHeaderTitle(pathName: string): string {
  return (
    [...menuList, ...menuAdmin].find((item: MenuItem) => item.path === pathName)
      ?.name ?? ""
  );
}
