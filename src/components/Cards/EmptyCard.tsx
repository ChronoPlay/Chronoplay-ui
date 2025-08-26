import React from "react";

export default function EmptyCardDemo() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6">
            <EmptyCard unit={10} rounded />
        </div>
    );
}

export function EmptyCard({
    unit = 10,
    rounded = true,
}: {
    unit?: number;
    rounded?: boolean;
}) {
    const cardStyle: React.CSSProperties = {
        width: 30 * unit,
        height: 50 * unit,
        backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
    };

    return (
        <div
            className={[
                "relative border border-gray-300 shadow-md flex items-center justify-center",
                rounded ? "rounded-2xl overflow-hidden" : "",
            ].join(" ")}
            style={cardStyle}
        >
            <span className="text-lg font-semibold text-gray-500 select-none">
                Empty
            </span>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-200" />
        </div>
    );
}
