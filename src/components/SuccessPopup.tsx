"use client";

import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import successAnimation from "../../public/success-animation.json";

interface SuccessPopupProps {
    message: string;
    buttonText?: string;
    onOk: () => void;
}

export default function SuccessPopup({
    message,
    buttonText = "Okay",
    onOk,
}: SuccessPopupProps) {
    const lottieRef = useRef<any>(null);

    useEffect(() => {
        if (!lottieRef.current) return;

        const animation = lottieRef.current;

        // Play from start
        animation.goToAndPlay(0, true);

        // Stop animation after 2 seconds
        const timer = setTimeout(() => {
            animation.pause();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="fixed inset-0 bg-primary-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={onOk}
        >
            <div
                className="bg-primary-100 dark:bg-surface-dark border border-primary-200 dark:border-primary-700 rounded-lg p-6 max-w-sm w-full flex flex-col shadow-xl"
                style={{ height: "320px" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-center flex-grow mb-4">
                    <Lottie
                        lottieRef={lottieRef}
                        animationData={successAnimation}
                        loop={false}
                        style={{ width: 120, height: 120 }}
                    />
                </div>

                <p className="text-center text-primary-900 dark:text-primary-100 text-lg font-semibold mb-6">
                    {message}
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={onOk}
                        className="px-6 py-2 bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 text-primary-50 rounded-lg font-semibold transition-colors shadow-md border border-primary-800 dark:border-primary-500"
                    >
                        {buttonText}
                    </button>

                </div>
            </div>
        </div>
    );
}
