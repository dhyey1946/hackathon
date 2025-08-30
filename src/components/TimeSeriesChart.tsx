import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

type DataPoint = { date: string; incidents: number };

type TimeSeriesChartProps = {
    dateRange?: { start: Date | null; end: Date | null };
    incidentType?: string | null;
};

const mockData: DataPoint[] = [
    { date: "2025-08-01", incidents: 5 },
    { date: "2025-08-05", incidents: 9 },
    { date: "2025-08-10", incidents: 7 },
    { date: "2025-08-15", incidents: 6 },
    { date: "2025-08-20", incidents: 12 },
    { date: "2025-08-25", incidents: 8 },
    { date: "2025-08-30", incidents: 11 },
];

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ dateRange, incidentType }) => {
    // In real app, filter or fetch data based on props

    void dateRange;
    void incidentType;

    return (
        <div style={{ width: "100%", height: 250 }}>
            <h3 className="mb-4 font-semibold text-gray-700">Incident Trend Over Time</h3>
            <ResponsiveContainer>
                <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="incidents" stroke="#22c55e" strokeWidth={3} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TimeSeriesChart;
