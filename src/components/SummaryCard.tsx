import React from "react";

type SummaryCardProps = {
    title: string;
    value: number | string;
    icon?: React.ReactNode;
    colorClass?: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
                                                     title,
                                                     value,
                                                     icon,
                                                     colorClass = "text-green-600",
                                                 }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center space-y-4 h-44 text-center">
            {icon && <div className={`text-6xl ${colorClass}`}>{icon}</div>}
            <p className="uppercase text-gray-400 font-semibold tracking-wider">{title}</p>
            <p className="text-5xl font-extrabold text-gray-900">{value}</p>
        </div>
    );
};

export default SummaryCard;
