import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import HorizontalNav from "../components/common/Nav";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* <CollapsibleSideNav /> */}

      {/* Main content area */}

      <div className="flex flex-col min-h-screen">
        <Header />
        <HorizontalNav />

        <main className="flex-1 ">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
