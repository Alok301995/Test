import React, { useState, useRef } from "react";
import {
  Settings,
  Menu,
  Home,
  Users,
  FileText,
  ChevronRight,
  HelpCircle,
  BarChart2,
} from "lucide-react";
import { useAppContext } from "../../context/AppContex";

export default function CollapsibleSideNav() {
  const sidebarRef = useRef(null);
  const {
    isExpanded,
    activeItem,
    handleLinkClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useAppContext();

  const navItems = [
    { name: "My Projects", icon: <Home size={20} />, href: "#" },
    { name: "New Project", icon: <BarChart2 size={20} />, href: "#" },
    { name: "Change Request", icon: <FileText size={20} />, href: "#" },
    { name: "Learning and Innovation", icon: <Users size={20} />, href: "#" },
    { name: "Settings", icon: <Settings size={20} />, href: "#" },
  ];

  return (
    <div
      ref={sidebarRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`h-screen fixed top-0 left-0 bg-gray-900 text-white transition-all duration-400 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col z-20 shadow-xl`}
    >
      {/* Logo/Brand Area at top */}
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <Menu size={24} />
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto mt-4">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <a
                href={item.href}
                className={`flex items-center py-3 px-4 hover:bg-gray-800 transition-colors ${
                  !isExpanded ? "justify-center" : ""
                } ${activeItem === index ? "bg-gray-700" : ""}`}
                onClick={() => handleLinkClick(index)}
              >
                <div className={`${isExpanded ? "mr-3" : ""} flex-shrink-0`}>
                  {item.icon}
                </div>
                {isExpanded && (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{item.name}</span>
                    {/* <ChevronRight size={16} className="flex-shrink-0 ml-2" /> */}
                  </div>
                )}
              </a>
              {!isExpanded && (
                <div className="hidden group-hover:block absolute left-20 bg-gray-800 text-white p-2 rounded shadow-lg z-10 whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
