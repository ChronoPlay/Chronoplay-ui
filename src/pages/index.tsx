import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">
        Welcome to ChronoPlay
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Your adventure starts here.
      </p>
    </div>
  );
}


