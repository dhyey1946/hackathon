import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowLeft, FaEdit, FaSave, FaTimes, FaCamera, FaLeaf,
    FaAward, FaMedal, FaStar, FaMapMarkerAlt, FaCalendarAlt
} from "react-icons/fa";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra",
        bio: "Environmental enthusiast passionate about mangrove conservation and marine ecosystem protection.",
        joinDate: "2024-01-15",
        avatar: "https://i.pravatar.cc/150?img=1",
    });

    const [editData, setEditData] = useState(profileData);

    const userStats = {
        totalReports: 28,
        validatedReports: 24,
        pointsEarned: 1240,
        rank: 3,
        badgesEarned: 6,
    };

    const recentReports = [
        {
            id: "1",
            type: "Mangrove Cutting",
            location: "Versova Beach",
            date: "2025-08-25",
            status: "Validated",
        },
        {
            id: "2",
            type: "Waste Dumping",
            location: "Mahim Creek",
            date: "2025-08-20",
            status: "Pending",
        },
        {
            id: "3",
            type: "Pollution",
            location: "Bandra Reclamation",
            date: "2025-08-15",
            status: "Validated",
        },
    ];

    const badges = [
        { name: "Mangrove Protector", icon: <FaLeaf />, color: "text-green-600", earned: true },
        { name: "Top Contributor", icon: <FaAward />, color: "text-yellow-500", earned: true },
        { name: "Community Hero", icon: <FaMedal />, color: "text-purple-600", earned: true },
        { name: "Superstar Reporter", icon: <FaStar />, color: "text-pink-500", earned: false },
        { name: "Guardian Angel", icon: <FaLeaf />, color: "text-blue-600", earned: false },
        { name: "Eco Warrior", icon: <FaAward />, color: "text-red-500", earned: true },
    ];

    const handleSave = () => {
        setProfileData(editData);
        setIsEditing(false);
        // Here you would typically save to backend
        console.log("Profile updated:", editData);
    };

    const handleCancel = () => {
        setEditData(profileData);
        setIsEditing(false);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setEditData({ ...editData, avatar: e.target.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Validated": return "text-green-600 bg-green-100";
            case "Pending": return "text-yellow-600 bg-yellow-100";
            case "Rejected": return "text-red-600 bg-red-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
            <div className="max-w-6xl mx-auto">
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
                        My Profile
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Information */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Info Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Profile Information</h2>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                                        >
                                            <FaSave className="mr-2" />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                                        >
                                            <FaTimes className="mr-2" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Avatar Section */}
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <img
                                            src={isEditing ? editData.avatar : profileData.avatar}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-green-200"
                                        />
                                        {isEditing && (
                                            <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full cursor-pointer transition-colors">
                                                <FaCamera />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 flex items-center justify-center">
                                            <FaCalendarAlt className="mr-2" />
                                            Joined {new Date(profileData.joinDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        </p>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.name}
                                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">{profileData.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">{profileData.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editData.phone}
                                                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium">{profileData.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Location
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.location}
                                                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                                            />
                                        ) : (
                                            <p className="text-gray-900 font-medium flex items-center">
                                                <FaMapMarkerAlt className="mr-2 text-green-600" />
                                                {profileData.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Bio
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editData.bio}
                                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 resize-none"
                                    />
                                ) : (
                                    <p className="text-gray-700">{profileData.bio}</p>
                                )}
                            </div>
                        </div>

                        {/* Recent Reports */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Reports</h2>
                            <div className="space-y-4">
                                {recentReports.map((report) => (
                                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">{report.type}</p>
                                            <p className="text-sm text-gray-600 flex items-center mt-1">
                                                <FaMapMarkerAlt className="mr-1" />
                                                {report.location}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">{report.date}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Stats Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contribution Stats</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total Reports</span>
                                    <span className="text-2xl font-bold text-green-600">{userStats.totalReports}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Validated Reports</span>
                                    <span className="text-2xl font-bold text-blue-600">{userStats.validatedReports}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Points Earned</span>
                                    <span className="text-2xl font-bold text-purple-600">{userStats.pointsEarned}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Current Rank</span>
                                    <span className="text-2xl font-bold text-yellow-600">#{userStats.rank}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Badges Earned</span>
                                    <span className="text-2xl font-bold text-red-600">{userStats.badgesEarned}</span>
                                </div>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Badges</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {badges.map((badge, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                                            badge.earned
                                                ? 'border-green-200 bg-green-50'
                                                : 'border-gray-200 bg-gray-50 grayscale opacity-60'
                                        }`}
                                    >
                                        <div className={`text-3xl mb-2 ${badge.color}`}>
                                            {badge.icon}
                                        </div>
                                        <span className="text-xs font-medium text-center">{badge.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
