import React from "react";

export default function CardDemo() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6">
            <Card
                number={"#027"}
                rarity="Legendary"
                name="Sky Serpent"
                description="A swift guardian of the high winds. Gains +2 agility when played after a weather card."
                imageUrl="https://images.unsplash.com/photo-1548092372-0d1bd40894a3?q=80&w=1200&auto=format&fit=crop"
                unit={10}
                rounded
            />
        </div>
    );
}

export function Card({
    number,
    rarity,
    name,
    description,
    imageUrl,
    unit = 10,
    rounded = true,
}: {
    number: string | number;
    rarity: string;
    name: string;
    description: string;
    imageUrl: string;
    unit?: number;
    rounded?: boolean;
}) {
    const cardStyle: React.CSSProperties = {
        width: 30 * unit,
        height: 50 * unit,
        backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
    };

    const imageStyle: React.CSSProperties = {
        width: 30 * unit,
        height: 25 * unit,
    };

    return (
        <div
            className={[
                "relative border border-gray-300 shadow-md",
                "flex flex-col",
                rounded ? "rounded-2xl overflow-hidden" : "",
            ].join(" ")}
            style={cardStyle}
        >
            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 backdrop-blur-sm">
                <span className="text-sm font-semibold text-gray-700 select-none px-2 py-1 bg-white/60 rounded-md shadow-sm">{number}</span>
                <span className="text-xs font-medium tracking-wide uppercase text-gray-700 select-none px-2 py-1 bg-white/60 rounded-md shadow-sm">{rarity}</span>
            </div>

            <div className="w-full border-b border-gray-200 bg-gray-100/60">
                <img
                    src={imageUrl}
                    alt={name}
                    style={imageStyle}
                    className="block object-cover"
                />
            </div>

            <div className="px-3 pt-3">
                <h3 className="text-base font-bold leading-none text-gray-800">{name}</h3>
            </div>

            <div className="px-3 pb-3 pt-2 overflow-auto">
                <p className="text-sm leading-snug text-gray-700">{description}</p>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-200" />
        </div>
    );
}
