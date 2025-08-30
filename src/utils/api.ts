import type { Incident, User, Badge, DateRange } from "../types/index";

const mockIncidents: Incident[] = [
    {
        id: "1",
        latitude: 21.1094,
        longitude: 72.7700,
        type: "Mangrove Cutting",
        description: "Illegal cutting near village beach.",
        reporter: "User123",
        timestamp: "2025-08-29T14:22:00Z",
        status: "Validated",
    },
    {
        id: "2",
        latitude: 21.1070,
        longitude: 72.7620,
        type: "Waste Dumping",
        description: "Plastic waste close to shoreline.",
        reporter: "User456",
        timestamp: "2025-08-28T10:15:00Z",
        status: "Pending",
    },
    // Add more mock data as needed
];

const mockUsers: User[] = [
    { id: "1", name: "Alice Green", avatarUrl: "https://i.pravatar.cc/40?img=1", points: 1200 },
    { id: "2", name: "Ben Fisher", avatarUrl: "https://i.pravatar.cc/40?img=2", points: 1050 },
    // Add more mock users
];

const mockBadges: Badge[] = [
    {
        id: "1",
        name: "Mangrove Protector",
        description: "Reported 10 validated incidents",
        earned: true,
    },
    {
        id: "2",
        name: "Top Contributor",
        description: "Top 5 contributor for the month",
        earned: true,
    },
    // Add more badges
];

export async function fetchIncidents(
    dateRange?: DateRange,
    incidentType?: string | null
): Promise<Incident[]> {
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 300));
    return mockIncidents.filter((incident) => {
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
}

export async function fetchUsers(): Promise<User[]> {
    await new Promise((r) => setTimeout(r, 300));
    return mockUsers;
}

export async function fetchBadges(): Promise<Badge[]> {
    await new Promise((r) => setTimeout(r, 300));
    return mockBadges;
}
