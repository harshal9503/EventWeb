import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Shield, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      // Demo credentials
      if (
        credentials.email === "admin@eventhub.com" &&
        credentials.password === "admin123"
      ) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin");
      } else {
        setError("Invalid admin credentials");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar variant="home" />

      <div className="container mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 group"
        >
          <svg
            className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white text-center mb-2">
                Admin Portal
              </h1>
              <p className="text-gray-400 text-center">
                Restricted access to authorized personnel only
              </p>
            </div>

            {/* Login Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="admin@eventhub.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-900/20 border border-red-800 rounded-xl flex items-start space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-300 font-medium">Access Denied</p>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded bg-gray-700 border-gray-600 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-400">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-primary-400 hover:text-primary-300"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Login as Admin
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-center text-gray-400 text-sm">
                  <span className="text-gray-500">Demo Credentials:</span>{" "}
                  <span className="font-mono text-gray-300">
                    admin@eventhub.com
                  </span>{" "}
                  / <span className="font-mono text-gray-300">admin123</span>
                </p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-gray-300">
                    Security Notice:
                  </span>{" "}
                  This area contains sensitive event data. All access is logged
                  and monitored.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
