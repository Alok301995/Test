import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import CollapsibleSideNav from "../components/common/SideNav";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <CollapsibleSideNav />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 ml-20 ">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
