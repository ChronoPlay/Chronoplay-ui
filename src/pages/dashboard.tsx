import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getWithExpiry } from "@/utils/storage";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        // Example: check login from localStorage (adjust as per your auth logic)
        const token = getWithExpiry("authToken");
        if (!token) {
            router.push("/"); // redirect to home/login if not logged in
        }
    }, [router]);

    return (
        <div className="min-h-screen w-full bg-yellow-50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-yellow-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-yellow-800">Dashboard</h1>
            </div>

            {/* Content */}
            <div className="flex items-center justify-center h-[70vh]">
                <div className="bg-white border border-yellow-200 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold text-yellow-800">
                        This is Dashboard
                    </h2>
                </div>
            </div>
        </div>
    );
}
