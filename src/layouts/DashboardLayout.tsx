import { ReactElement } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { getHeaderTitle } from "../utils";

export function DashboardLayout(): ReactElement {
  const navigation = useLocation();
  return (
    <div
      className={
        "flex w-screen h-screen overflow-x-hidden overflow-y-auto bg-[#f8f8f6] text-black"
      }
    >
      <Navbar />
      <div className={"flex grow flex-col"}>
        <Header name={getHeaderTitle(navigation.pathname)} />
        <div className={"border border-[#f1f0f0] grow p-6"}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
