import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import Router from "next/router";
import { NOTIFICATIONS_API, READ_NOTIFICATION_API } from "@/constants/api";
import { getWithExpiry } from "@/utils/storage";

type Notification = {
    notification_id: string;
    title?: string;
    message: string;
    created_at: string; // ISO string
    read: boolean;
};

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch notifications
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
            await fetch(READ_NOTIFICATION_API, {
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
            await fetch(READ_NOTIFICATION_API, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getWithExpiry("authToken")}`
                },
                body: JSON.stringify({ read_all: true })
            });

            // Update local state
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error("Failed to mark all notifications as read:", err);
        }
    }

    // Only top 4 notifications
    const topNotifications = notifications.slice(0, 4);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full hover:bg-yellow-100"
            >
                <Bell className="w-6 h-6 text-yellow-700" />
                {notifications.some(n => !n.read) && (
                    <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
                )}
            </button>

            {/* Dropdown Panel */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-yellow-50 border border-yellow-200">
                    <div className="p-3 flex justify-between items-center border-b border-yellow-200">
                        <span className="font-semibold text-yellow-800">Notifications</span>
                        <button
                            onClick={markAllAsRead}
                            className="text-sm text-yellow-600 hover:underline"
                        >
                            Mark all as read
                        </button>
                    </div>
                    <ul className="max-h-64 overflow-y-auto divide-y divide-yellow-200">
                        {topNotifications.length === 0 && (
                            <li className="p-3 text-sm text-yellow-600 text-center">
                                No notifications
                            </li>
                        )}
                        {topNotifications.map((n) => (
                            <li
                                key={n.notification_id}
                                className={`p-3 cursor-pointer hover:bg-yellow-100 ${n.read ? "bg-gray-100" : "bg-white"
                                    }`}
                                onClick={() => markAsRead(n.notification_id)}
                            >
                                <p
                                    className={`text-sm ${n.read ? "text-gray-700" : "text-yellow-900 font-medium"
                                        }`}
                                >
                                    {n.message}
                                </p>
                                <span className="text-xs text-yellow-600">
                                    {new Date(n.created_at).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="p-3 text-center border-t border-yellow-200">
                        <button
                            onClick={() => Router.push("/notifications")}
                            className="text-sm text-yellow-600 hover:underline"
                        >
                            See all
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
