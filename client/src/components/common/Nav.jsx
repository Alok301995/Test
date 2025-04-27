import React, { useRef } from "react";
import { Settings, Home, Users, FileText, BarChart2 } from "lucide-react";
import { useAppContext } from "../../context/AppContex";

export default function HorizontalNav() {
  const navRef = useRef(null);
  const { activeItem, handleLinkClick } = useAppContext();

  const navItems = [
    { name: "My Projects", icon: <Home size={20} />, href: "#" },
    { name: "New Project", icon: <BarChart2 size={20} />, href: "#" },
    { name: "Change Request", icon: <FileText size={20} />, href: "#" },
    { name: "Learning and Innovation", icon: <Users size={20} />, href: "#" },
    { name: "Dashboard", icon: <Settings size={20} />, href: "#" },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg z-20 sticky top-0">
      <div className=" mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Area */}

          {/* Navigation - Responsive for all screen sizes */}
          <nav className="flex items-center">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors ${
                  activeItem === index ? "bg-blue-700" : ""
                } mx-1 md:mx-2`}
                onClick={() => handleLinkClick(index)}
              >
                <div className="mr-2">{item.icon}</div>
                <span className="hidden sm:inline">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* User Profile/Account Area */}
        </div>
      </div>
    </header>
  );
}
