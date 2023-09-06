import React from "react";
import Sidebar from "./Sidebar";
import { FreeCounter } from "./FreeCounter";

export const SideBarContainer = () => {
  return (
    <div className=" space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <Sidebar />
      <FreeCounter />
    </div>
  );
};
