import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCamera, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import InteractiveLocationPicker from "../components/InteractiveLocationPicker";

const RegisterReport: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        incidentType: "",
        description: "",
        reporterName: "",
        reporterEmail: "",
        photos: [] as File[],
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const incidentTypes = [
        "Mangrove Cutting",
        "Waste Dumping",
        "Land Reclamation",
        "Pollution",
        "Illegal Construction",
        "Water Contamination",
        "Other",
    ];

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.latitude || !formData.longitude) {
            newErrors.location = "Location coordinates are required";
        }
        if (!formData.incidentType) {
            newErrors.incidentType = "Please select an incident type";
        }
        if (!formData.description.trim() || formData.description.length < 20) {
            newErrors.description = "Description must be at least 20 characters";
        }
        if (!formData.reporterName.trim()) {
            newErrors.reporterName = "Reporter name is required";
        }
        if (!formData.reporterEmail.trim() || !/\S+@\S+\.\S+/.test(formData.reporterEmail)) {
            newErrors.reporterEmail = "Valid email address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData({
                        ...formData,
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to get current location. Please enter coordinates manually.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFormData({
                ...formData,
                photos: [...formData.photos, ...newFiles].slice(0, 5), // Max 5 photos
            });
        }
    };

    const removePhoto = (index: number) => {
        setFormData({
            ...formData,
            photos: formData.photos.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Report submitted successfully! Thank you for helping protect our mangroves.");
            navigate("/dashboard");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert("Failed to submit report. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center text-green-600 hover:text-green-700 font-medium transition-colors mr-4"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-extrabold text-green-800 drop-shadow-md">
                        Register New Report
                    </h1>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Location Section */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                                <FaMapMarkerAlt className="mr-3 text-green-600" />
                                Location Details
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex space-x-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Latitude
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                value={formData.latitude}
                                                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                                placeholder="21.1094"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Longitude
                                            </label>
                                            <input
                                                type="number"
                                                step="any"
                                                value={formData.longitude}
                                                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                                placeholder="72.7700"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={getCurrentLocation}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
                                    >
                                        Use Current Location
                                    </button>

                                    {errors.location && (
                                        <p className="text-red-600 text-sm flex items-center">
                                            <FaExclamationTriangle className="mr-2" />
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                {/* Interactive Map */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-medium text-gray-800">Or select location on map:</h4>
                                    <InteractiveLocationPicker
                                        latitude={formData.latitude}
                                        longitude={formData.longitude}
                                        onLocationChange={(lat, lng) => {
                                            setFormData({ ...formData, latitude: lat, longitude: lng });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Incident Details */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Incident Details</h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Incident Type
                                    </label>
                                    <select
                                        value={formData.incidentType}
                                        onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                    >
                                        <option value="">Select incident type</option>
                                        {incidentTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.incidentType && (
                                        <p className="text-red-600 text-sm mt-1">{errors.incidentType}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 resize-none"
                                        placeholder="Provide detailed description of the incident, including what you observed, approximate time, and any other relevant information..."
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        {formData.description.length}/500 characters (minimum 20)
                                    </p>
                                    {errors.description && (
                                        <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Photos Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800 flex items-center">
                                <FaCamera className="mr-3 text-green-600" />
                                Photos (Optional)
                            </h3>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                    id="photo-upload"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="cursor-pointer flex flex-col items-center"
                                >
                                    <FaCamera className="text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-600">Click to upload photos</p>
                                    <p className="text-sm text-gray-500">Maximum 5 photos, each up to 10MB</p>
                                </label>
                            </div>

                            {formData.photos.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {formData.photos.map((photo, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Upload ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Reporter Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Reporter Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.reporterName}
                                    onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                    placeholder="Your full name"
                                />
                                {errors.reporterName && (
                                    <p className="text-red-600 text-sm mt-1">{errors.reporterName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={formData.reporterEmail}
                                    onChange={(e) => setFormData({ ...formData, reporterEmail: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                    placeholder="your.email@example.com"
                                />
                                {errors.reporterEmail && (
                                    <p className="text-red-600 text-sm mt-1">{errors.reporterEmail}</p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard")}
                                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg transition-colors flex items-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Report"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterReport;
