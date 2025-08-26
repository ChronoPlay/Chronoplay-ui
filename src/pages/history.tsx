// pages/history.tsx
import { GET_TRANSACTION_HISTORY_API } from "@/constants/api";
import { getWithExpiry } from "@/utils/storage";
import { useEffect, useState } from "react";

type Card = {
    card_number: string;
    amount: number;
    name?: string;
};

type Transaction = {
    transaction_guid: number;
    cards_recieved: Card[];
    cards_sent: Card[];
    cash_sent: number;
    cash_recieved: number;
    status: string;
    time: string;
    transaction_with: number; // friend id
};

// Map status → Tailwind classes
const statusStyles: Record<string, string> = {
    Completed: "bg-green-200 text-green-800",
    Pending: "bg-yellow-200 text-yellow-800",
    Declined: "bg-red-200 text-red-800",
    Failed: "bg-red-300 text-red-900",
};

export default function HistoryPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        fetch(GET_TRANSACTION_HISTORY_API, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getWithExpiry("authToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data: { data: Transaction[] }) => {
                console.log("Fetched transaction history:", data?.data);
                setTransactions(data?.data || []);
            })
            .catch((err) => console.error("Error fetching transactions:", err));
    }, []);

    // Capitalize first letter of status
    const formatStatus = (status: string) =>
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    // Format date nicely
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-200 p-8">
            <h1 className="text-3xl font-extrabold text-yellow-800 mb-8 text-center drop-shadow">
                Transaction History
            </h1>

            <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
                {/* LEFT SIDE - Filters */}
                <div className="col-span-1 bg-yellow-50 border border-yellow-300 rounded-xl p-4 shadow-md h-fit">
                    <h2 className="text-lg font-bold text-yellow-900 mb-4">Filters</h2>

                    <div className="space-y-3 text-sm text-yellow-800">
                        <div>
                            <label className="block font-semibold mb-1">Status</label>
                            <select className="w-full rounded-lg border border-yellow-300 p-2 focus:outline-none">
                                <option>All</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Declined</option>
                                <option>Failed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Friend</label>
                            <input
                                type="text"
                                placeholder="Search friend..."
                                className="w-full rounded-lg border border-yellow-300 p-2 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-1">Cash Range</label>
                            <input
                                type="number"
                                placeholder="Min"
                                className="w-full rounded-lg border border-yellow-300 p-2 mb-2 focus:outline-none"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                className="w-full rounded-lg border border-yellow-300 p-2 focus:outline-none"
                            />
                        </div>

                        <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg font-semibold transition">
                            Apply Filters
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE - Transactions */}
                <div className="col-span-3 space-y-4">
                    {transactions?.length === 0 ? (
                        <p className="text-center text-yellow-800 font-medium">
                            No transactions yet.
                        </p>
                    ) : (
                        transactions.map((tx) => (
                            <div
                                key={tx.transaction_guid}
                                className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 shadow-md hover:shadow-lg hover:bg-yellow-100 transition duration-200"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold text-yellow-900">
                                        With User #{tx.transaction_with}
                                    </h2>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full font-semibold ${statusStyles[formatStatus(tx.status)] ||
                                            "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        {formatStatus(tx.status)}
                                    </span>
                                </div>

                                <div className="text-xs text-gray-600 mb-2">
                                    <p>
                                        <span className="font-bold">Transaction ID:</span>{" "}
                                        {tx.transaction_guid}
                                    </p>
                                    <p>
                                        <span className="font-bold">Date:</span>{" "}
                                        {formatDate(tx.time)}
                                    </p>
                                </div>

                                <div className="text-sm text-gray-700 space-y-1">
                                    {tx.cash_sent > 0 && (
                                        <p>
                                            <span className="font-bold text-yellow-900">
                                                Cash Sent:
                                            </span>{" "}
                                            {tx.cash_sent} 💰
                                        </p>
                                    )}
                                    {tx.cash_recieved > 0 && (
                                        <p>
                                            <span className="font-bold text-yellow-900">
                                                Cash Received:
                                            </span>{" "}
                                            {tx.cash_recieved} 💰
                                        </p>
                                    )}
                                    {tx.cards_sent?.length > 0 && (
                                        <p>
                                            <span className="font-bold text-yellow-900">
                                                Cards Sent:
                                            </span>{" "}
                                            {tx.cards_sent
                                                .map(
                                                    (c) =>
                                                        `#${c.card_number} (x${c.amount})`
                                                )
                                                .join(", ")}{" "}
                                            🃏
                                        </p>
                                    )}
                                    {tx.cards_recieved?.length > 0 && (
                                        <p>
                                            <span className="font-bold text-yellow-900">
                                                Cards Received:
                                            </span>{" "}
                                            {tx.cards_recieved
                                                .map(
                                                    (c) =>
                                                        `#${c.card_number} (x${c.amount})`
                                                )
                                                .join(", ")}{" "}
                                            🃏
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
