// // app/profile/page.tsx
// import { Card } from "@/components/Cards/Card";
// import { EmptyCard } from "@/components/Cards/EmptyCard";
// import React from "react";

// export default function ProfilePage() {
//     // Example fallback data — replace with API call
//     const name = "Sparsh Kumar";
//     const avatarUrl = "/placeholder-avatar.png";
//     const cards = [
//         { id: 1, title: "Card 1", imageUrl: "/placeholder-card.png" },
//         { id: 2, title: "Card 2", imageUrl: "/placeholder-card.png" },
//         { id: 3, title: "Card 3", imageUrl: "/placeholder-card.png" },
//     ];

//     const totalSlots = 8;
//     const filledCards = cards.slice(0, totalSlots);
//     const emptySlots = totalSlots - filledCards.length;

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             {/* Profile Section */}
//             <div className="flex items-center gap-4 mb-8">
//                 <img
//                     src={avatarUrl}
//                     alt={name}
//                     className="w-20 h-20 rounded-full border border-gray-300"
//                 />
//                 <div>
//                     <h1 className="text-2xl font-bold">{name}</h1>
//                     <p className="text-gray-500">Player Profile</p>
//                 </div>
//             </div>

//             {/* Cards Section */}
//             <div className="grid grid-cols-4 gap-4">
//                 {filledCards.map((card) => (
//                     <Card {...{ number: "#027", rarity: "Legendary", name: "Sky Serpent", description: "A swift guardian of the high winds. Gains +2 agility when played after a weather card.", imageUrl: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1200&auto=format&fit=crop", unit: 7, rounded: true }} />
//                 ))}

//                 {/* Empty Slots */}
//                 {Array.from({ length: emptySlots }).map((_, i) => (
//                     <EmptyCard {...{ unit: 7, rounded: true }} />
//                 ))}
//             </div>
//         </div>
//     );
// }


// app/profile/page.tsx
// import React from "react";

// export default function ProfilePage() {
//     const user = {
//         name: "Ethan",
//         email: "ethan.miller@email.com",
//         avatar:
//             "https://lh3.googleusercontent.com/aida-public/AB6AXuCqFyjr-ClOkBW9CcCYefAgOEJgMLzlTNSuvCmVS09OdFNar4rewCq2nLDhLEhrZJfnJBeQffT-e4U2Tvz9N9IeGs64GcGnxgmsjjS1nUfTBWmRrJMMmifLGlmL8_rRtbIck9yzo6zmNsCJfUyCTIq7fzFySpUUNb868uVsv8PPUy2ziV0GjuxLd73araBsmxz6E8CSvKWXcVA2wVytIvaUZK2Eg5M_-mzqq4LjpQiHdyaffCZEi0EHRZzAAnm-nRpd2cTxqh7-R7M",
//         joined: "2021",
//         lastActive: "2024",
//         phone: "(555) 123-4567",
//     };

//     const cards = [
//         { id: "001", title: "Card A", desc: "Description of Card A", img: "https://picsum.photos/300?random=1" },
//         { id: "002", title: "Card B", desc: "Description of Card B", img: "https://picsum.photos/300?random=2" },
//         { id: "003", title: "Card C", desc: "Description of Card C", img: "https://picsum.photos/300?random=3" },
//         { id: "004", title: "Card D", desc: "Description of Card D", img: "https://picsum.photos/300?random=4" },
//         { id: "005", title: "Card E", desc: "Description of Card E", img: "https://picsum.photos/300?random=5" },
//         { id: "006", title: "Card F", desc: "Description of Card F", img: "https://picsum.photos/300?random=6" },
//         { id: "007", title: "Card G", desc: "Description of Card G", img: "https://picsum.photos/300?random=7" },
//         { id: "008", title: "Card H", desc: "Description of Card H", img: "https://picsum.photos/300?random=8" },
//     ];

//     return (
//         <div
//             className="relative flex size-full min-h-screen flex-col bg-white overflow-x-hidden"
//             style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
//         >
//             <div className="flex h-full grow flex-col px-6 py-5 gap-1">
//                 {/* LEFT SIDEBAR */}
//                 <div className="flex flex-col w-80">
//                     <div className="flex p-4">
//                         <div className="flex flex-col w-full gap-4 items-center">
//                             <div
//                                 className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
//                                 style={{ backgroundImage: `url(${user.avatar})` }}
//                             ></div>
//                             <div className="flex flex-col items-center">
//                                 <p className="text-[#181611] text-[22px] font-bold text-center">
//                                     {user.name}
//                                 </p>
//                                 <p className="text-[#8a8060] text-base font-normal text-center">
//                                     {user.email}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* BASIC INFO */}
//                     <h3 className="text-[#181611] text-lg font-bold px-4 pb-2 pt-4">
//                         Basic Info
//                     </h3>
//                     <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
//                         <div className="col-span-2 grid grid-cols-subgrid border-t border-[#e6e3db] py-5">
//                             <p className="text-[#8a8060] text-sm">Joined</p>
//                             <p className="text-[#181611] text-sm">{user.joined}</p>
//                         </div>
//                         <div className="col-span-2 grid grid-cols-subgrid border-t border-[#e6e3db] py-5">
//                             <p className="text-[#8a8060] text-sm">Last Active</p>
//                             <p className="text-[#181611] text-sm">{user.lastActive}</p>
//                         </div>
//                     </div>

//                     {/* CONTACT */}
//                     <h3 className="text-[#181611] text-lg font-bold px-4 pb-2 pt-4">
//                         Contact
//                     </h3>
//                     <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
//                         <div className="col-span-2 grid grid-cols-subgrid border-t border-[#e6e3db] py-5">
//                             <p className="text-[#8a8060] text-sm">Phone</p>
//                             <p className="text-[#181611] text-sm">{user.phone}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT CONTENT */}
//                 <div className="flex flex-col flex-1 max-w-[960px]">
//                     <div className="flex flex-wrap justify-between gap-3 p-4">
//                         <div className="flex min-w-72 flex-col gap-3">
//                             <p className="text-[#181611] text-[32px] font-bold">Profile</p>
//                             <p className="text-[#8a8060] text-sm">
//                                 Select the top 8 cards to display on your profile
//                             </p>
//                         </div>
//                     </div>

//                     {/* TOP 8 CARDS */}
//                     <h2 className="text-[#181611] text-[22px] font-bold px-4 pb-3 pt-5">
//                         Top 8 Cards
//                     </h2>
//                     <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
//                         {cards.map((card) => (
//                             <div key={card.id} className="flex flex-col gap-3 pb-3">
//                                 <div
//                                     className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
//                                     style={{ backgroundImage: `url(${card.img})` }}
//                                 ></div>
//                                 <div>
//                                     <p className="text-[#181611] text-base font-medium">
//                                         {card.id} {card.title}
//                                     </p>
//                                     <p className="text-[#8a8060] text-sm">{card.desc}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* BUTTONS */}
//                     <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
//                         <button className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#f2b90d] text-[#181611] text-sm font-bold">
//                             Binder
//                         </button>
//                         <button className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 bg-[#f5f3f0] text-[#181611] text-sm font-bold">
//                             Cash: $100
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



// import { Card } from "@/components/Cards/Card";
// import { EmptyCard } from "@/components/Cards/EmptyCard";
// import React from "react";

// export default function ProfilePage() {
//     const name = "Sparsh Kumar";
//     const avatarUrl = "/https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1200&auto=format&fit=crop";
//     const cards = [
//         { id: 1, title: "Card 1", imageUrl: "/placeholder-card.png" },
//         { id: 2, title: "Card 2", imageUrl: "/placeholder-card.png" },
//         { id: 3, title: "Card 3", imageUrl: "/placeholder-card.png" },
//     ];

//     const totalSlots = 8;
//     const filledCards = cards.slice(0, totalSlots);
//     const emptySlots = totalSlots - filledCards.length;
//     return (
//         <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6 ">
//             {/* Left Side - Profile Info */}
//             <div className="w-1/4 border-r border-gray-200 pr-6 flex flex-col items-center">
//                 <img
//                     src={avatarUrl}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full object-cover mb-4"
//                 />
//                 <h2 className="text-xl font-bold">{name}</h2>
//                 <p className="text-gray-500 text-sm">john.doe@example.com</p>

//                 <div className="mt-6 text-sm text-gray-600 space-y-1">
//                     <p><strong>Joined:</strong> Jan 2023</p>
//                     <p><strong>Location:</strong> New York, USA</p>
//                     <p><strong>Role:</strong> Premium Member</p>
//                 </div>
//             </div>

//             {/* Right Side - Cards Grid */}
//             <div className="w-3/4 pl-6">
//                 <div className="grid grid-cols-4 gap-4">
//                     {filledCards.map((card) => (
//                         <Card {...{ number: "#027", rarity: "Legendary", name: "Sky Serpent", description: "A swift guardian of the high winds. Gains +2 agility when played after a weather card.", imageUrl: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1200&auto=format&fit=crop", unit: 7, rounded: true }} />
//                     ))}

//                     {/* Empty Slots */}
//                     {Array.from({ length: emptySlots }).map((_, i) => (
//                         <EmptyCard {...{ unit: 7, rounded: true }} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { Card } from "@/components/Cards/Card";
import { EmptyCard } from "@/components/Cards/EmptyCard";
import React from "react";

export default function ProfilePage() {
    const name = "Sparsh Kumar";
    const avatarUrl = "/placeholder-avatar.png"; // Make sure this file exists in /public
    const cards = [
        { id: 1, title: "Card 1", imageUrl: "/placeholder-card.png" },
        { id: 2, title: "Card 2", imageUrl: "/placeholder-card.png" },
        { id: 3, title: "Card 3", imageUrl: "/placeholder-card.png" },
    ];

    const totalSlots = 8;
    const filledCards = cards.slice(0, totalSlots);
    const emptySlots = totalSlots - filledCards.length;

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-1 transition-colors">
            {/* Outer Container */}
            <div className="flex w-full max-w-8xl rounded-xl shadow p-6 gap-6">

                {/* Left Side - Profile Info */}
                <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 pr-6 flex flex-col items-center">
                    <img
                        src={avatarUrl}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full object-cover mb-4 border border-gray-300 dark:border-gray-600"
                    />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">john.doe@example.com</p>

                    <div className="mt-6 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <p><strong>Joined:</strong> Jan 2023</p>
                        <p><strong>Location:</strong> New York, USA</p>
                        <p><strong>Role:</strong> Premium Member</p>
                    </div>
                </div>

                {/* Right Side - Cards Grid */}
                <div className="w-3/4 pl-6 flex flex-col">
                    <div className="grid grid-cols-4 gap-4">
                        {filledCards.map((card) => (
                            <Card
                                key={card.id}
                                number="#027"
                                rarity="Legendary"
                                name="Sky Serpent"
                                description="A swift guardian of the high winds. Gains +2 agility when played after a weather card."
                                imageUrl="https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1200&auto=format&fit=crop"
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

