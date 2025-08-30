import React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

type CategoryPieChartProps = {
    dateRange?: { start: Date | null; end: Date | null };
    incidentType?: string | null;
};

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

const mockData = [
    { name: "Mangrove Cutting", value: 45 },
    { name: "Waste Dumping", value: 30 },
    { name: "Land Reclamation", value: 15 },
    { name: "Pollution", value: 10 },
];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ dateRange, incidentType }) => {
    // In a real app, data would be filtered/fetched based on props

    void dateRange;
    void incidentType;

    return (
        <div style={{ width: "100%", height: 250 }}>
            <h3 className="mb-4 font-semibold text-gray-700">Incident Types Overview</h3>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={mockData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#22c55e"
                        label
                    >
                        {mockData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryPieChart;
