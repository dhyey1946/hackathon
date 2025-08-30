import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue with Leaflet + Webpack/Vite
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type Incident = {
    id: string;
    latitude: number;
    longitude: number;
    type: string;
    description: string;
    reporter: string;
    timestamp: string;
};

type MapViewProps = {
    dateRange?: { start: Date | null; end: Date | null };
    incidentType?: string | null;
};

const mockIncidents: Incident[] = [
    {
        id: "1",
        latitude: 21.1094,
        longitude: 72.7700,
        type: "Mangrove Cutting",
        description: "Illegal cutting detected near coastal area.",
        reporter: "User123",
        timestamp: "2025-08-29T14:22:00Z",
    },
    {
        id: "2",
        latitude: 21.1070,
        longitude: 72.7620,
        type: "Waste Dumping",
        description: "Dumping of non-biodegradable waste.",
        reporter: "User456",
        timestamp: "2025-08-28T10:15:00Z",
    },
];

const MapView: React.FC<MapViewProps> = ({ dateRange, incidentType }) => {
    // Filter incidents based on props
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
        <MapContainer
            center={[21.1094, 72.7700]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredIncidents.map((incident) => (
                <Marker key={incident.id} position={[incident.latitude, incident.longitude]}>
                    <Popup>
                        <strong>{incident.type}</strong>
                        <p>{incident.description}</p>
                        <p>
                            Reported by <em>{incident.reporter}</em>
                        </p>
                        <p>{new Date(incident.timestamp).toLocaleString()}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
