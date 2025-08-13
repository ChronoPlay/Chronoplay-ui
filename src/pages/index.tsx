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

      <main className="min-h-screen flex flex-col items-center justify-center bg-primary-50 dark:bg-bg-dark px-6 pt-16 transition-colors">
        {/* Video Container - Centered Box */}
        <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-300 dark:border-primary-600 bg-gray-900">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            src="/welcome-bg.mp4"
            onError={(e) => console.error('Video error:', e)}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={(e) => {
              console.log('Video can play');
              const video = e.target as HTMLVideoElement;
              video.play().catch((err: any) => console.error('Play failed:', err));
            }}
            onLoadedData={() => console.log('Video loaded')}
            onPlay={() => console.log('Video playing')}
          />

          {/* Text Overlay on Video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 ">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-primary-800 drop-shadow-2xl mb-4">
              Play smart. Stay alive
            </h1>

            <p className="text-lg md:text-xl max-w-2xl font-normal leading-relaxed text-primary-700 drop-shadow-lg mb-6">
              Jump into ChronoPlay, where you compete against others
            </p>

            <button
              onClick={handleGetStarted}
              className="rounded-full bg-primary-600 hover:bg-primary-700 px-8 py-3 font-bold text-primary-50 transition-all transform hover:scale-105 shadow-xl border-2 border-primary-800"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Additional Content Below Video */}
        <div className="mt-12 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-800 dark:text-primary-200 mb-4">
            Welcome to ChronoPlay
          </h2>
          <p className="text-primary-700 dark:text-primary-300">
            Experience the ultimate card game adventure with stunning visuals and competitive gameplay.
          </p>
        </div>
      </main>
    </>
  );
}
