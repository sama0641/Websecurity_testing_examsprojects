import React from "react";

import SideBar from "../components/sidebar/SideBar";
import { Outlet } from "react-router-dom";

const DashboardWrapper = () => {
  return (
    <section className="flex justify-between">
      <div className="w-full md:w-1/4 bg-orange-300 min-h-[88vh] h-full">
        <SideBar />
      </div>
      <div className="w-full md:3/4">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardWrapper;
