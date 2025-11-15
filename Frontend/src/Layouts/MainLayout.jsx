import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";

export default function MainLayout() {
    return(
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}