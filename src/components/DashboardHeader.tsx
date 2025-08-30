import React, { useState } from "react";
import { FaUserCircle, FaPlusCircle, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardHeader: React.FC = () => {
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = () => {
        setProfileOpen(false);
        // Add logout logic here (clear auth tokens, redirect to login, etc.)
        console.log("Logout clicked");
    };

    return (
        <div className="flex items-center justify-between mb-10">
            <h1 className="text-5xl font-extrabold text-green-800 drop-shadow-md select-none">
                Mangrove Watch Dashboard
            </h1>

            <div className="flex items-center space-x-6">
                {/* Register Report Button */}
                <Link
                    to="/register-report"
                    className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                    <FaPlusCircle className="mr-2 text-lg" />
                    Register New Report
                </Link>

                {/* User Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none transition-colors duration-200"
                        aria-label="User profile menu"
                    >
                        <FaUserCircle className="text-4xl" />
                        <FaChevronDown className={`text-sm transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl py-2 z-20 border border-gray-100">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500">john.doe@example.com</p>
                            </div>

                            <Link
                                to="/profile"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-150"
                                onClick={() => setProfileOpen(false)}
                            >
                                <span className="text-sm font-medium">My Profile</span>
                            </Link>

                            <Link
                                to="/settings"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-150"
                                onClick={() => setProfileOpen(false)}
                            >
                                <span className="text-sm font-medium">Settings</span>
                            </Link>

                            <Link
                                to="/my-reports"
                                className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-150"
                                onClick={() => setProfileOpen(false)}
                            >
                                <span className="text-sm font-medium">My Reports</span>
                            </Link>

                            <div className="border-t border-gray-100 mt-2">
                                <button
                                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors duration-150"
                                    onClick={handleLogout}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
