import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import Router from "next/router";

export default function NotificationDropdown() {
    const [open, setOpen] = useState(false);
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

    const notifications = [
        { id: 1, message: "Your order #1023 has been shipped.", time: "2h ago" },
        { id: 2, message: "New comment on your post.", time: "5h ago" },
        { id: 3, message: "Password changed successfully.", time: "1d ago" },
        { id: 4, message: "New follower: @john_doe", time: "2d ago" },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full hover:bg-yellow-100"
            >
                <Bell className="w-6 h-6 text-yellow-700" />
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-red-500"></span>
                )}
            </button>

            {/* Dropdown Panel */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-yellow-50 border border-yellow-200">
                    <div className="p-3 flex justify-between items-center border-b border-yellow-200">
                        <span className="font-semibold text-yellow-800">Notifications</span>
                        <button
                            onClick={() => console.log("Mark all as read")}
                            className="text-sm text-yellow-600 hover:underline"
                        >
                            Mark all as read
                        </button>
                    </div>
                    <ul className="max-h-64 overflow-y-auto divide-y divide-yellow-200">
                        {notifications.map((n) => (
                            <li key={n.id} className="p-3 hover:bg-yellow-100">
                                <p className="text-sm text-yellow-900">{n.message}</p>
                                <span className="text-xs text-yellow-600">{n.time}</span>
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
