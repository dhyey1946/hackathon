import React from "react";

type Incident = {
    id: string;
    type: string;
    description: string;
    reporter: string;
    timestamp: string;
    status: "Pending" | "Validated" | "Rejected";
};

type RecentIncidentsProps = {
    dateRange?: { start: Date | null; end: Date | null };
    incidentType?: string | null;
};

const mockIncidents: Incident[] = [
    {
        id: "1",
        type: "Mangrove Cutting",
        description: "Illegal cutting near village beach.",
        reporter: "User123",
        timestamp: "2025-08-29T14:22:00Z",
        status: "Validated",
    },
    {
        id: "2",
        type: "Waste Dumping",
        description: "Plastic waste dumped close to shoreline.",
        reporter: "User456",
        timestamp: "2025-08-28T10:15:00Z",
        status: "Pending",
    },
    {
        id: "3",
        type: "Pollution",
        description: "Oil spill detected near mangrove roots.",
        reporter: "User789",
        timestamp: "2025-08-27T16:05:00Z",
        status: "Rejected",
    },
];

const statusColors = {
    Pending: "bg-yellow-300 text-yellow-800",
    Validated: "bg-green-300 text-green-800",
    Rejected: "bg-red-300 text-red-800",
};

const RecentIncidents: React.FC<RecentIncidentsProps> = ({ dateRange, incidentType }) => {
    // Filter logic can be expanded as needed
    const filteredIncidents = mockIncidents.filter((incident) => {
        let match = true;
        if (incidentType && incident.type !== incidentType) {
            match = false;
        }
        if (dateRange?.start && new Date(incident.timestamp) < dateRange.start) {
            match = false;
        }
        if (dateRange?.end && new Date(incident.timestamp) > dateRange.end) {
            match = false;
        }
        return match;
    });

    return (
        <div>
            <h3 className="mb-4 font-semibold text-gray-700">Recent Incident Reports</h3>
            <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200">
                {filteredIncidents.map(({ id, type, description, reporter, timestamp, status }) => (
                    <li key={id} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{type}</p>
                            <p className="text-sm text-gray-600">{description}</p>
                            <p className="text-xs text-gray-500">
                                Reported by {reporter} &middot; {new Date(timestamp).toLocaleString()}
                            </p>
                        </div>
                        <span
                            className={`mt-2 sm:mt-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
                        >
              {status}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentIncidents;
