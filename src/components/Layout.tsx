import { ReactNode } from "react";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-primary-50 text-primary-900 dark:bg-bg-dark dark:text-primary-100 transition-colors">
      {/* Navbar with fixed height */}
      <header className="h-16 flex-shrink-0">
        <Navbar />
      </header>

      {/* Main content fills remaining space */}
      <main className="flex-grow p-6 overflow-auto">
        {children}
      </main>

      {/* Footer with fixed height */}
      <footer className="h-12 flex-shrink-0 text-center p-4 bg-primary-100 dark:bg-surface-dark border-t border-primary-200 dark:border-primary-700">
        <p className="text-sm text-primary-700 dark:text-primary-300">
          © {new Date().getFullYear()} ChronoPlay. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
