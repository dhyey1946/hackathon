import React from "react";
import SummaryCard from "./SummaryCard";
import { FaTree, FaCheckCircle, FaUsers } from "react-icons/fa";

type SummaryCardsContainerProps = {
    dateRange?: { start: Date | null; end: Date | null };
    incidentType?: string | null;
};

const SummaryCardsContainer: React.FC<SummaryCardsContainerProps> = ({ dateRange, incidentType }) => {
    // Mock data, ideally fetched from API based on filters
    void dateRange;
    void incidentType;

    const totalIncidents = 124;
    const validatedReports = 95;
    const activeUsers = 48;

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full px-4">
                <SummaryCard
                    title="Total Incidents"
                    value={totalIncidents}
                    icon={<FaTree />}
                    colorClass="text-green-600"
                />
                <SummaryCard
                    title="Validated Reports"
                    value={validatedReports}
                    icon={<FaCheckCircle />}
                    colorClass="text-blue-500"
                />
                <SummaryCard
                    title="Active Users"
                    value={activeUsers}
                    icon={<FaUsers />}
                    colorClass="text-purple-600"
                />
            </div>
        </div>
    );
};

export default SummaryCardsContainer;
