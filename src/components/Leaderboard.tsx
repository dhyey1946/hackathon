import React from "react";

type User = {
    id: string;
    name: string;
    points: number;
    avatarUrl?: string;
};

const mockUsers: User[] = [
    { id: "1", name: "Alice Green", points: 1200, avatarUrl: "https://i.pravatar.cc/40?img=1" },
    { id: "2", name: "Ben Fisher", points: 1050, avatarUrl: "https://i.pravatar.cc/40?img=2" },
    { id: "3", name: "Cara White", points: 980, avatarUrl: "https://i.pravatar.cc/40?img=3" },
    { id: "4", name: "David Lee", points: 920, avatarUrl: "https://i.pravatar.cc/40?img=4" },
    { id: "5", name: "Emma Brown", points: 880, avatarUrl: "https://i.pravatar.cc/40?img=5" },
];

const Leaderboard: React.FC = () => {
    return (
        <div>
            <h3 className="mb-4 font-semibold text-gray-700">Top Contributors</h3>
            <ol className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                {mockUsers.map((user, index) => (
                    <li key={user.id} className="py-3 flex items-center space-x-4">
                        <span className="w-6 text-lg font-bold text-green-600">{index + 1}</span>
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                            loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">{user.points} pts</div>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
