import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 px-6 bg-gray-800 text-white text-center border-t border-gray-700">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
