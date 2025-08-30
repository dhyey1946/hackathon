import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 px-4">
            <div className="max-w-md w-full bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-lg p-8">
                <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
                    Mangrove Watch
                </h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                            autoComplete="email"
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
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <p className="text-red-600 font-medium">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 rounded-lg shadow-lg transition"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-700">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-green-600 font-semibold hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
