import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Lock } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Login = ({ setIsUserAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call to check registration
    setTimeout(() => {
      const registrations = JSON.parse(
        localStorage.getItem("registrations") || "[]"
      );
      const isRegistered = registrations.some((reg) => reg.email === email);

      if (isRegistered) {
        setOtpSent(true);
        // Store email for OTP verification
        localStorage.setItem("userEmail", email);

        // In a real app, you would send OTP via email
        // For demo, we'll generate a random OTP
        const demoOtp = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem("demoOtp", demoOtp);

        console.log("Demo OTP (for testing):", demoOtp);
      } else {
        setError("This email is not registered. Please register first.");
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, accept any 6-digit OTP or the specific demo OTP
      const demoOtp = localStorage.getItem("demoOtp") || "123456";

      if (enteredOtp === demoOtp || enteredOtp === "123456") {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        setIsUserAuthenticated(true);
        navigate("/portal");
      } else {
        setError("Invalid OTP. Try 123456 for demo.");
      }

      setIsLoading(false);
    }, 1000);
  };

  const handleMagicLink = () => {
    setIsLoading(true);

    // Simulate magic link sent
    setTimeout(() => {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      setIsUserAuthenticated(true);
      navigate("/portal");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <Navbar variant="home" />

      <div className="container mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="card">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {otpSent ? "Verify Your Email" : "Access Your Portal"}
              </h1>
              <p className="text-gray-600">
                {otpSent
                  ? "Enter the 6-digit code sent to your email"
                  : "Enter your registered email to continue"}
              </p>
            </div>

            {!otpSent ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="input-field"
                    placeholder="john@example.com"
                    autoComplete="email"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium">Access Denied</p>
                      <p className="text-red-600 text-sm">{error}</p>
                      {error.includes("not registered") && (
                        <Link
                          to="/register"
                          className="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          Click here to register →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full py-4"
                >
                  Continue with Email
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleMagicLink}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Send Magic Link
                </button>

                <p className="text-center text-gray-500 text-sm">
                  Not registered yet?{" "}
                  <Link
                    to="/register"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-800 font-medium">
                      OTP Sent Successfully
                    </p>
                    <p className="text-emerald-600 text-sm">
                      We've sent a 6-digit code to <strong>{email}</strong>
                    </p>
                    <p className="text-emerald-500 text-xs mt-1">
                      Demo OTP: <span className="font-mono">123456</span>
                    </p>
                  </div>
                </motion.div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    6-Digit Verification Code
                  </label>
                  <div className="flex space-x-3 justify-center">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        id={`otp-${index}`}
                        className="w-14 h-14 text-center text-2xl font-bold input-field focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-red-600 text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full py-4"
                >
                  Verify & Continue
                </Button>

                <div className="text-center space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp(["", "", "", "", "", ""]);
                      setError("");
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Use different email
                  </button>
                  <p className="text-gray-500 text-sm">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        // Resend OTP
                        const demoOtp = Math.floor(
                          100000 + Math.random() * 900000
                        ).toString();
                        localStorage.setItem("demoOtp", demoOtp);
                        alert(`New OTP sent: ${demoOtp}`);
                      }}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Demo Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-800 font-medium">Demo Instructions</p>
                <p className="text-blue-600 text-sm">
                  1. Enter any valid email format (e.g., user@example.com)
                  <br />
                  2. For OTP, use <span className="font-mono">123456</span>
                  <br />
                  3. Or use "Send Magic Link" for instant access
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
