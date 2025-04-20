import { useState, useContext } from "react";
import { User, ChevronDown, LogOut, Settings } from "lucide-react";
import Logo from "../../assets/logo.webp"; // Adjust the path as necessary

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md z-10 ml-20">
      {/* Logo on the left */}
      <div className="flex items-center">
        <div className="rounded-md flex items-center justify-center">
          <img src={Logo} alt="Logo" className=" h-12 rounded-md" />
        </div>
        <span className="ml-3 text-xl font-medium">
          Analytics Center of Excellence
        </span>
      </div>

      {/* Profile section on the right */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={toggleMenu}
        >
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          <span className="font-medium">John Doe</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={closeMenu} />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <a
                href="#profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User size={16} className="mr-3" />
                My Profile
              </a>
              <a
                href="#settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} className="mr-3" />
                Settings
              </a>
              <div className="border-t border-gray-100 my-1"></div>
              <a
                href="#logout"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut size={16} className="mr-3" />
                Sign out
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
