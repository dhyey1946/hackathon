import React from "react";

type FiltersPanelProps = {
    dateRange: { start: Date | null; end: Date | null };
    setDateRange: (range: { start: Date | null; end: Date | null }) => void;
    incidentType: string | null;
    setIncidentType: (type: string | null) => void;
};

const incidentTypes = [
    "Mangrove Cutting",
    "Waste Dumping",
    "Land Reclamation",
    "Pollution",
];

const FiltersPanel: React.FC<FiltersPanelProps> = ({
                                                       dateRange,
                                                       setDateRange,
                                                       incidentType,
                                                       setIncidentType,
                                                   }) => {
    return (
        <div className="bg-white rounded shadow p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">

            {/* Incident Type Selector */}
            <div>
                <label htmlFor="incidentType" className="block text-gray-700 font-semibold mb-1">
                    Incident Type
                </label>
                <select
                    id="incidentType"
                    value={incidentType || ""}
                    onChange={(e) => setIncidentType(e.target.value || null)}
                    className="w-full sm:w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <option value="">All Types</option>
                    {incidentTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Date Range Inputs */}
            <div className="flex space-x-4 items-center">
                <div>
                    <label htmlFor="startDate" className="block text-gray-700 font-semibold mb-1">
                        Start Date
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={dateRange.start ? dateRange.start.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                            setDateRange({ start: e.target.value ? new Date(e.target.value) : null, end: dateRange.end })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-gray-700 font-semibold mb-1">
                        End Date
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={dateRange.end ? dateRange.end.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                            setDateRange({ start: dateRange.start, end: e.target.value ? new Date(e.target.value) : null })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
            </div>

        </div>
    );
};

export default FiltersPanel;
