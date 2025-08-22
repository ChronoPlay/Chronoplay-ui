"use client";

import { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { Menu, X, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openMenu = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    setIsOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push("/"); // redirect to home page
  };

  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 shadow-md bg-yellow-200 dark:bg-yellow-900 border-b border-yellow-300 dark:border-yellow-700 z-30 relative">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary-800 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-100 transition-colors">
          ChronoPlay
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={openMenu}
          className="p-2 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-700 text-primary-700 dark:text-primary-300 transition-colors"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Overlay for main content when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-opacity-20 z-40 transition-opacity"
        ></div>
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-yellow-100/95 dark:bg-yellow-900/95 backdrop-blur-sm shadow-2xl transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 z-50 flex flex-col border-l border-yellow-300/50 dark:border-yellow-700/50`}
      >
        {/* Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col gap-2 p-4">
          {!isLoggedIn ? (
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors"
            >
              Login / Signup
            </Link>
          ) : (
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors"
            >
              Profile
            </Link>
          )}
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/contribute"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-3 rounded-lg transition-colors"
          >
            Contribute
          </Link>
        </nav>

        {/* Bottom Section */}
        <div
          className={`mt-auto p-4 border-t border-gray-200/50 dark:border-gray-700/50 flex ${isLoggedIn ? "justify-between" : "justify-center"
            } items-center gap-4`}
        >
          {/* Dark Mode Toggle */}
          {/* <DarkModeToggle /> */}

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
            >
              Logout
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
