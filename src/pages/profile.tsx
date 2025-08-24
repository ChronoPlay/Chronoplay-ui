import { Card } from "@/components/Cards/Card";
import { EmptyCard } from "@/components/Cards/EmptyCard";
import { PROFILE_API } from "@/constants/api";
import { getWithExpiry } from "@/utils/storage";
import React, { useEffect, useState } from "react";

export default function ProfilePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);

    const name = "Sparsh Kumar";
    const avatarUrl = "/avatar.png"; // Make sure this file exists in /public
    const initialCards = [
        { id: 1, title: "Card 1", imageUrl: "/placeholder-card.png" },
        { id: 2, title: "Card 2", imageUrl: "/placeholder-card.png" },
        { id: 3, title: "Card 3", imageUrl: "/placeholder-card.png" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ✅ Only access localStorage inside useEffect (client-side)
                const token = getWithExpiry("authToken");
                console.log("Token from localStorage:", token);
                if (!token) {
                    console.error("No token found in localStorage");
                    setLoading(false);
                    return;
                }

                const response = await fetch(PROFILE_API, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                if (response.ok) {
                    setData(result.data);
                    setCards(result.data.cards || initialCards); // Use fetched cards or fallback
                } else {
                    console.error("Failed to fetch profile data:", result);
                }
            } catch (err) {
                console.error("Error fetching profile data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalSlots = 8;
    const filledCards = cards.slice(0, totalSlots);
    const emptySlots = totalSlots - filledCards.length;

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-1 transition-colors">
            {/* Outer Container */}
            <div className="flex w-full max-w-8xl rounded-xl shadow p-6 gap-6 bg-yellow-50">
                {/* Left Side - Profile Info */}
                <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 pr-6 flex flex-col items-center">
                    <img
                        src={avatarUrl}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full object-cover mb-4 border border-gray-300 dark:border-gray-600"
                    />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{data?.user_name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{data?.email}</p>

                    <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <p><strong>Name:</strong> {data?.name}</p>
                        <p><strong>Phone Number:</strong> {data?.phone_number}</p>
                        <p><strong>Cash:</strong> {data?.cash}</p>
                        <p><strong>Role:</strong> {data?.user_type}</p>
                    </div>
                </div>

                {/* Right Side - Cards Grid */}
                <div className="w-3/4 pl-6 flex flex-col">
                    <div className="grid grid-cols-4 gap-4">
                        {cards.map((card) => (
                            console.log("Rendering card:", card),
                            <Card
                                key={card.number}
                                number={card.number}
                                rarity={card.rarity}
                                name={card.name}
                                description={card.description}
                                imageUrl={card.image}
                                unit={7}
                                rounded={true}
                            />
                        ))}

                        {/* Empty Slots */}
                        {Array.from({ length: emptySlots }).map((_, i) => (
                            <EmptyCard key={`empty-${i}`} unit={7} rounded={true} />
                        ))}
                    </div>

                    {/* Buttons Below Cards */}
                    <div className="mt-6 flex gap-4">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
                            Open Binder
                        </button>
                        <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow">
                            Edit Visible Cards
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
