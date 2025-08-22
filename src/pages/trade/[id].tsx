import { useRouter } from "next/router";
import { Coins, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { GET_POSSIBLE_EXCHANGE_API } from "@/constants/api";

type Card = {
    number: string;
    name: string;
    occupied: number;
};

type TradeData = {
    yourCash: number;
    traderCash: number;
    yourCards: Card[];
    traderCards: Card[];
};

export default function TradePage() {
    const router = useRouter();
    const { id } = router.query;

    const [yourCash, setYourCash] = useState(0);
    const [traderCash, setTraderCash] = useState(0);
    const [yourCards, setYourCards] = useState<Card[]>([]);
    const [traderCards, setTraderCards] = useState<Card[]>([]);

    const [expandedYou, setExpandedYou] = useState(false);
    const [expandedTrader, setExpandedTrader] = useState(false);

    const [yourCardQuantities, setYourCardQuantities] = useState<{ [key: string]: number }>({});
    const [traderCardQuantities, setTraderCardQuantities] = useState<{ [key: string]: number }>({});

    // max cash values (from API)
    const [yourCashMax, setYourCashMax] = useState(0);
    const [traderCashMax, setTraderCashMax] = useState(0);

    // fetch trade data
    useEffect(() => {
        if (!id) return;

        const fetchTradeData = async () => {
            try {
                const res = await fetch(`${GET_POSSIBLE_EXCHANGE_API}?user_id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });
                const resp = await res.json();
                console.log("Trade API response:", resp);
                if (!res.ok) throw new Error(resp.message || "Failed to fetch trade data");
                const data: TradeData = resp.data;
                console.log("Trade Data:", data);

                setYourCash(0);
                setTraderCash(0);
                setYourCards(data.yourCards || []);
                setTraderCards(data.traderCards || []);
                setYourCashMax(data.yourCash || 0);
                setTraderCashMax(data.traderCash || 0);

                console.log("Trade data fetched successfully");
            } catch (err) {
                console.error("Failed to fetch trade data:", err);
            }
        };

        fetchTradeData();
    }, [id]);

    // ensure only one side cash > 0
    const handleCashChange = (side: "you" | "trader", value: number) => {
        if (value < 0) return;

        if (side === "you") {
            if (value > yourCashMax) value = yourCashMax;
            setYourCash(value);
            if (value > 0) setTraderCash(0);
        } else {
            if (value > traderCashMax) value = traderCashMax;
            setTraderCash(value);
            if (value > 0) setYourCash(0);
        }
    };

    // handle card quantity changes
    const handleCardQtyChange = (
        side: "you" | "trader",
        cardNumber: string,
        value: number,
        max: number
    ) => {
        if (value < 0) return;
        if (value > max) value = max;

        if (side === "you") {
            setYourCardQuantities((prev) => ({ ...prev, [cardNumber]: value }));
        } else {
            setTraderCardQuantities((prev) => ({ ...prev, [cardNumber]: value }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 flex flex-col items-center py-10">
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-yellow-900 mb-10 drop-shadow-md">
                ⚔️ Trade Arena
            </h1>

            {/* Show loading state */}
            {yourCards?.length === 0 && traderCards?.length === 0 ? (
                <p className="text-yellow-800 font-semibold">Loading trade data...</p>
            ) : (
                <div className="grid grid-cols-2 gap-10 w-11/12 max-w-6xl">
                    {/* Left Side - You Offer */}
                    <div className="bg-yellow-300/70 rounded-2xl shadow-xl p-6 flex flex-col items-center border-4 border-yellow-500">
                        <h2 className="text-2xl font-bold text-yellow-900 mb-6">You Offer</h2>

                        {/* Cash Offer */}
                        <div
                            className={`flex flex-col gap-2 p-4 rounded-xl shadow-md w-full transition
                                ${yourCash > 0 ? "bg-green-200/70 hover:bg-green-300/80" : "bg-yellow-200 hover:bg-yellow-100"}
                            `}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <Coins className="text-yellow-700 w-8 h-8" />
                                <span className="text-lg font-semibold text-yellow-900 flex-1">Cash</span>
                                <input
                                    type="number"
                                    min={0}
                                    max={yourCashMax}
                                    value={yourCash}
                                    onChange={(e) => handleCashChange("you", Number(e.target.value))}
                                    placeholder="Enter amount"
                                    className="w-32 text-right px-3 py-1 rounded-lg border border-yellow-600 
                                        focus:outline-none 
                                        [appearance:textfield] 
                                        [&::-webkit-outer-spin-button]:appearance-none 
                                        [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <span className="text-xs text-yellow-800">Max: {yourCashMax}</span>
                        </div>

                        {/* Cards Offer */}
                        <div className="flex flex-col gap-3 mt-6 w-full">
                            <h3 className="text-lg font-semibold text-yellow-800">Your Cards</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {(expandedYou ? yourCards : yourCards.slice(0, 3)).map((card) => {
                                    const qty = yourCardQuantities[card.number] || 0;
                                    return (
                                        <div
                                            key={card.number}
                                            className={`p-3 rounded-xl flex flex-col gap-2 shadow transition ${qty > 0
                                                ? "bg-green-200/70 hover:bg-green-300/80"
                                                : "bg-yellow-200 hover:bg-yellow-100"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-6 h-6 text-yellow-700" />
                                                <span>
                                                    #{card.number} {card.name}
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                min={0}
                                                max={card.occupied}
                                                value={qty}
                                                onChange={(e) =>
                                                    handleCardQtyChange("you", card.number, Number(e.target.value), card.occupied)
                                                }
                                                className="w-full px-2 py-1 rounded-lg border border-yellow-600 text-right 
                                                    focus:outline-none 
                                                    [appearance:textfield] 
                                                    [&::-webkit-outer-spin-button]:appearance-none 
                                                    [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                            <span className="text-xs text-yellow-800">Max: {card.occupied}</span>
                                        </div>
                                    );
                                })}

                                {yourCards.length > 3 && (
                                    <div
                                        onClick={() => setExpandedYou(!expandedYou)}
                                        className="bg-yellow-300/70 p-3 rounded-xl flex items-center justify-center shadow cursor-pointer hover:bg-yellow-200"
                                    >
                                        <span className="font-semibold text-yellow-900">
                                            {expandedYou ? "Show Less" : "+ Show More"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - You Demand */}
                    <div className="bg-yellow-300/70 rounded-2xl shadow-xl p-6 flex flex-col items-center border-4 border-yellow-500">
                        <h2 className="text-2xl font-bold text-yellow-900 mb-6">You Demand</h2>

                        {/* Cash Demand */}
                        <div
                            className={`flex flex-col gap-2 p-4 rounded-xl shadow-md w-full transition
                                ${traderCash > 0 ? "bg-green-200/70 hover:bg-green-300/80" : "bg-yellow-200 hover:bg-yellow-100"}
                            `}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <Coins className="text-yellow-700 w-8 h-8" />
                                <span className="text-lg font-semibold text-yellow-900 flex-1">Cash</span>
                                <input
                                    type="number"
                                    min={0}
                                    max={traderCashMax}
                                    value={traderCash}
                                    onChange={(e) => handleCashChange("trader", Number(e.target.value))}
                                    placeholder="Enter amount"
                                    className="w-32 text-right px-3 py-1 rounded-lg border border-yellow-600 
                                        focus:outline-none 
                                        [appearance:textfield] 
                                        [&::-webkit-outer-spin-button]:appearance-none 
                                        [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>
                            <span className="text-xs text-yellow-800">Max: {traderCashMax}</span>
                        </div>

                        {/* Trader's Cards */}
                        <div className="flex flex-col gap-3 mt-6 w-full">
                            <h3 className="text-lg font-semibold text-yellow-800">Trader's Cards</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {(expandedTrader ? traderCards : traderCards.slice(0, 3)).map((card) => {
                                    const qty = traderCardQuantities[card.number] || 0;
                                    return (
                                        <div
                                            key={card.number}
                                            className={`p-3 rounded-xl flex flex-col gap-2 shadow transition ${qty > 0
                                                ? "bg-green-200/70 hover:bg-green-300/80"
                                                : "bg-yellow-200 hover:bg-yellow-100"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-6 h-6 text-yellow-700" />
                                                <span>
                                                    #{card.number} {card.name}
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                min={0}
                                                max={card.occupied}
                                                value={qty}
                                                onChange={(e) =>
                                                    handleCardQtyChange(
                                                        "trader",
                                                        card.number,
                                                        Number(e.target.value),
                                                        card.occupied
                                                    )
                                                }
                                                className="w-full px-2 py-1 rounded-lg border border-yellow-600 text-right 
                                                    focus:outline-none 
                                                    [appearance:textfield] 
                                                    [&::-webkit-outer-spin-button]:appearance-none 
                                                    [&::-webkit-inner-spin-button]:appearance-none"
                                            />
                                            <span className="text-xs text-yellow-800">Max: {card.occupied}</span>
                                        </div>
                                    );
                                })}

                                {traderCards.length > 3 && (
                                    <div
                                        onClick={() => setExpandedTrader(!expandedTrader)}
                                        className="bg-yellow-300/70 p-3 rounded-xl flex items-center justify-center shadow cursor-pointer hover:bg-yellow-200"
                                    >
                                        <span className="font-semibold text-yellow-900">
                                            {expandedTrader ? "Show Less" : "+ Show More"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Button */}
            <button className="mt-10 px-8 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xl shadow-lg transition">
                🚀 Propose Trade
            </button>
        </div>
    );
}
