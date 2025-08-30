import React from "react";
import { FaLeaf, FaAward, FaMedal, FaStar } from "react-icons/fa";

type Badge = {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    earned: boolean;
};

const mockBadges: Badge[] = [
    {
        id: "1",
        name: "Mangrove Protector",
        description: "Reported 10 validated incidents",
        icon: <FaLeaf className="text-green-600" />,
        earned: true,
    },
    {
        id: "2",
        name: "Top Contributor",
        description: "Top 5 contributor for the month",
        icon: <FaAward className="text-yellow-500" />,
        earned: true,
    },
    {
        id: "3",
        name: "Community Hero",
        description: "100 points earned",
        icon: <FaMedal className="text-purple-600" />,
        earned: false,
    },
    {
        id: "4",
        name: "Superstar Reporter",
        description: "Reported 50 validated incidents",
        icon: <FaStar className="text-pink-500" />,
        earned: false,
    },
];

const BadgesOverview: React.FC = () => {
    return (
        <div>
            <h3 className="mb-4 font-semibold text-gray-700">Earned Badges</h3>
            <div className="flex flex-wrap gap-4">
                {mockBadges.map(({ id, name, description, icon, earned }) => (
                    <div
                        key={id}
                        className={`flex flex-col items-center w-20 p-4 rounded-lg shadow cursor-default ${
                            earned ? "bg-white" : "bg-gray-100 filter grayscale"
                        }`}
                        title={description}
                    >
                        <div className="text-4xl mb-2">{icon}</div>
                        <p className="text-sm font-medium text-center">{name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BadgesOverview;
