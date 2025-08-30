export interface Incident {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    description: string;
    reporter: string;
    timestamp: string; // ISO string
    status: "Pending" | "Validated" | "Rejected";
}

export interface User {
    id: string;
    name: string;
    avatarUrl?: string;
    points: number;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    earned: boolean;
}

export interface DateRange {
    start: Date | null;
    end: Date | null;
}
