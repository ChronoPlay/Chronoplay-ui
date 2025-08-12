import DarkModeToggle from "./DarkModeToggle";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800">
        <h1 className="text-xl font-bold">ChronoPlay</h1>
        <DarkModeToggle />
      </header>

      {/* Page Content */}
      <main className="p-6">{children}</main>

      {/* Footer */}
      <footer className="text-center p-4 bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} ChronoPlay. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
    