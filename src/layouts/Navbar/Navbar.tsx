import { ReactElement } from "react";
import { Image } from "@nextui-org/react";
import Logo from "../../assets/logo.png";
import { appRoute, menuList } from "../../constants";
import { MenuItem } from "../../models/menuItem.model.ts";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { removeIdentityState } from "../../features/identity/identity.slice.ts";
import { useAppDispatch } from "../../app/hooks.ts";

export function Navbar(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(removeIdentityState());
    navigate(appRoute.LOGIN);
  };

  return (
    <div
      className={
        "flex flex-col gap-3 min-w-[15vw] overflow-auto bg-white px-4 py-6 justify-between"
      }
    >
      <div>
        <div className={"flex items-center justify-center mb-6 gap-2"}>
          <Image src={Logo} alt={"logo"} className={"w-[60px]"} />
        </div>
        <div className={"overflow-y-auto"}>
          <p className={"font-semibold mt-6"}>Menu</p>
          {menuList.menuList.map((item: MenuItem) => (
            <div
              className={
                "text-[#3c3c3c] flex flex-row transition-all py-2 px-3 gap-2 cursor-pointer items-center rounded-md hover:bg-[#377cf6] hover:text-white"
              }
              key={`Nav ${item.name}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon />
              <p>{item.name}</p>
            </div>
          ))}
          <p className={"font-semibold mt-6"}>Admin</p>
          {menuList.menuAdmin.map((item: MenuItem) => (
            <div
              className={
                "text-[#3c3c3c] flex flex-row transition-all py-2 px-3 gap-2 cursor-pointer items-center rounded-md hover:bg-[#377cf6] hover:text-white"
              }
              key={`Nav ${item.name}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          "flex px-3 gap-2 transition-all py-2 rounded-md items-center hover:bg-[#ededed] cursor-pointer"
        }
        onClick={onLogout}
      >
        <HiLogout />
        <p className={"font-semibold"}>Log Out</p>
      </div>
    </div>
  );
}
