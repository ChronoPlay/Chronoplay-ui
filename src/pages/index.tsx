"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <>
      {/* Navbar for home page */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </header>

      <main
        className="relative min-h-screen flex flex-col items-center justify-center bg-[#181711] text-black px-6 pt-16 overflow-hidden"
        style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
      >
        {/* Background Video */}
        <video
          className="fixed top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/welcome-bg.mp4" // Put your video file here in /public folder
        />

        {/* Overlay to blend video with theme */}
        <div className="fixed inset-0 bg-primary-100 bg-opacity-30 -z-5"></div>

        <div className="flex flex-col items-center gap-6 max-w-3xl text-center relative z-10">
          <h1 className="text-5xl font-black leading-tight tracking-tight text-primary-900 drop-shadow-lg">
            Unleash Your Inner Champion
          </h1>

          <p className="text-lg max-w-xl font-normal leading-relaxed text-primary-800 drop-shadow-md">
            Dive into the world of ChronoPlay, where strategy meets skill. Collect, build, and battle your way to victory in this thrilling competitive card game.
          </p>

          <button
            onClick={handleGetStarted}
            className="mt-4 rounded-full bg-primary-700 hover:bg-primary-800 px-8 py-3 font-bold text-primary-50 transition-all transform hover:scale-105 shadow-lg border border-primary-800"
          >
            Get Started
          </button>
        </div>
      </main>
    </>
  );
}
