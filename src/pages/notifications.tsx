import React from "react";

export default function NotificationsPage() {
    const notifications = [
        { id: 1, title: "Payment Received", message: "₹500 credited to your wallet.", time: "2m ago" },
        { id: 2, title: "Friend Request", message: "Aarav sent you a friend request.", time: "15m ago" },
        { id: 3, title: "Order Shipped", message: "Your order #027 is on its way.", time: "1h ago" },
        { id: 4, title: "Discount Offer", message: "Get 20% off on your next purchase.", time: "3h ago" },
    ];

    return (
        <div className="min-h-screen w-full bg-yellow-50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-yellow-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-yellow-800">Notifications</h1>
                <button className="px-4 py-2 rounded-xl bg-yellow-400 text-yellow-900 font-semibold hover:bg-yellow-500 shadow">
                    Mark all as read
                </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {notifications.map((n) => (
                    <div
                        key={n.id}
                        className="bg-white border border-yellow-200 p-4 rounded-xl shadow hover:shadow-md transition"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="font-semibold text-yellow-800">{n.title}</h2>
                                <p className="text-yellow-700">{n.message}</p>
                                <span className="text-sm text-yellow-600">{n.time}</span>
                            </div>
                            <button className="text-yellow-500 hover:text-yellow-700">✕</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
