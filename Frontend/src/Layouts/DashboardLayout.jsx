import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Components/DashboardNavbar";

export default function DasboardLayout() {
    return(
    <div className="min-h-screen flex">
        <DashboardNavbar />
        <main className="p-6">
          <Outlet />
        </main>
    </div>
    );
}