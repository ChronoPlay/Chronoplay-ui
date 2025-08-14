import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure we're on client
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  if (!mounted) return null; // Prevent mismatch

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-white font-medium shadow-md"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
