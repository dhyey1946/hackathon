import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

interface InteractiveLocationPickerProps {
    latitude: string;
    longitude: string;
    onLocationChange: (lat: string, lng: string) => void;
}

// Custom hook to handle map events
const LocationUpdater: React.FC<{
    onLocationChange: (lat: string, lng: string) => void;
    initialLat: number;
    initialLng: number;
}> = ({ onLocationChange, initialLat, initialLng }) => {
    const [locationName, setLocationName] = useState("Loading location...");

    const map = useMapEvents({
        dragend: () => {
            const center = map.getCenter();
            onLocationChange(center.lat.toString(), center.lng.toString());
            fetchLocationName(center.lat, center.lng);
        },
        zoomend: () => {
            const center = map.getCenter();
            onLocationChange(center.lat.toString(), center.lng.toString());
            fetchLocationName(center.lat, center.lng);
        },
    });

    const fetchLocationName = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`
            );
            const data = await response.json();
            setLocationName(data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setLocationName(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
    };

    // Initial location name fetch
    useEffect(() => {
        fetchLocationName(initialLat, initialLng);
    }, [initialLat, initialLng]);

    // Update map center when props change
    useEffect(() => {
        if (initialLat && initialLng) {
            map.setView([initialLat, initialLng], map.getZoom());
        }
    }, [initialLat, initialLng, map]);

    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
            <div className="bg-white rounded-lg shadow-lg px-4 py-2 max-w-sm">
                <div className="flex items-center">
                    <FaMapMarkerAlt className="text-green-600 mr-2" />
                    <p className="text-sm font-medium text-gray-700 truncate">{locationName}</p>
                </div>
            </div>
        </div>
    );
};

const InteractiveLocationPicker: React.FC<InteractiveLocationPickerProps> = ({
                                                                                 latitude,
                                                                                 longitude,
                                                                                 onLocationChange,
                                                                             }) => {
    const defaultLat = latitude ? parseFloat(latitude) : 21.1094;
    const defaultLng = longitude ? parseFloat(longitude) : 72.7700;

    return (
        <div className="relative">
            <div className="h-80 rounded-lg overflow-hidden border-2 border-gray-300 relative">
                <MapContainer
                    center={[defaultLat, defaultLng]}
                    zoom={15}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={true}
                    scrollWheelZoom={true}
                    dragging={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <LocationUpdater
                        onLocationChange={onLocationChange}
                        initialLat={defaultLat}
                        initialLng={defaultLng}
                    />
                </MapContainer>

                {/* Fixed Center Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000]">
                    <div className="relative">
                        {/* Crosshair */}
                        <FaCrosshairs className="text-3xl text-red-500 drop-shadow-lg" />

                        {/* Pulsing animation */}
                        <div className="absolute inset-0 animate-ping">
                            <FaCrosshairs className="text-3xl text-red-300" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Current Coordinates Display */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Selected Coordinates:</p>
                <p className="text-sm font-mono text-gray-800">
                    {latitude && longitude
                        ? `${parseFloat(latitude).toFixed(6)}, ${parseFloat(longitude).toFixed(6)}`
                        : "No location selected"
                    }
                </p>
            </div>
        </div>
    );
};

export default InteractiveLocationPicker;
