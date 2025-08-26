import { NOTIFICATIONS_API, READ_NOTIFICATION_API } from "@/constants/api";
import { getWithExpiry } from "@/utils/storage";
import React, { useEffect, useState } from "react";

type Notification = {
    notification_id: string;
    title: string;
    message: string;
    created_at: string; // ISO string
    read: boolean; // backend should return this
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const res = await fetch(NOTIFICATIONS_API, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getWithExpiry("authToken")}`
                    },
                });
                const data = await res.json();
                setNotifications(data.data || []);
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
            }
        }

        fetchNotifications();
    }, []);

    async function markAsRead(id: string) {
        try {
            await fetch(`${READ_NOTIFICATION_API}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getWithExpiry("authToken")}`
                },
                body: JSON.stringify({ notification_id: id })
            });
            // Update local state
            setNotifications(prev =>
                prev.map(n =>
                    n.notification_id === id ? { ...n, read: true } : n
                )
            );
        } catch (err) {
            console.error("Failed to mark notification as read:", err);
        }
    }

    async function markAllAsRead() {
        try {
            await fetch(`${READ_NOTIFICATION_API}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getWithExpiry("authToken")}`
                },
                body: JSON.stringify({ read_all: true }) // Assuming backend supports this
            });
            // Update local state
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error("Failed to mark all notifications as read:", err);
        }
    }

    return (
        <div className="min-h-screen w-full bg-yellow-50 p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-yellow-200 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-yellow-800">Notifications</h1>
                <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 rounded-xl bg-yellow-400 text-yellow-900 font-semibold hover:bg-yellow-500 shadow"
                >
                    Mark all as read
                </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {notifications.map((n) => (
                    <div
                        key={n.notification_id}
                        className={`border p-4 rounded-xl shadow hover:shadow-md transition 
                           ${n.read ? "bg-gray-100 border-gray-200" : "bg-white border-yellow-200"}`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h2
                                    className={`font-semibold ${n.read ? "text-gray-700" : "text-yellow-800"
                                        }`}
                                >
                                    {n.title}
                                </h2>
                                <p className={`${n.read ? "text-gray-600" : "text-yellow-700"}`}>
                                    {n.message}
                                </p>
                                <span className="text-sm text-yellow-600">
                                    {new Date(n.created_at).toLocaleString()}
                                </span>
                            </div>
                            {!n.read && (
                                <button
                                    onClick={() => markAsRead(n.notification_id)}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
