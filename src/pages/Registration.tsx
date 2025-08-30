import React, { useState } from "react";
import { Link } from "react-router-dom";

const Registration: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password strength regex:
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validate = () => {
        if (!username.trim()) {
            setError("Username is required.");
            return false;
        }
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError(
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
            );
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            alert("Registration successful! (Simulated)");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 px-4">
            <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg p-8">
                <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
                    Mangrove Watch Registration
                </h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-400 transition"
                            placeholder="Your username"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-400 transition"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-400 transition"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-semibold text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-400 transition"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {error && <p className="text-red-600 font-medium">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 rounded-lg shadow-lg transition"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-700">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 font-semibold hover:underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
