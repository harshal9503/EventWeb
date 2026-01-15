import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  FileText,
  MessageSquare,
  LogOut,
  X,
  Clock,
  CheckCircle,
  Star,
  Play,
  Calendar,
  User,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Tile from "../components/Tile";
import IframeView from "../components/IframeView";
import Loader, { PageLoader } from "../components/Loader"; // ✅ FIXED: Correct path
import Button from "../components/Button";

const Portal = () => {
  const [activeContent, setActiveContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tileLoading, setTileLoading] = useState({
    video: false,
    pdf: false,
    feedback: false,
  });
  const [userData, setUserData] = useState(null);

  // Updated URLs matching your public folder structure
  const videoUrl =
    "https://www.youtube.com/embed/qcTG5NXzuR0?si=gyu9K8VBk0SlrpY2";
  const pdfUrl = "/sample.pdf"; // ✅ Matches public/sample.pdf
  const feedbackUrl = "/feedback-form.html"; // ✅ Matches public/feedback-form.html

  useEffect(() => {
    // Get user data from localStorage
    const userEmail = localStorage.getItem("userEmail") || "user@example.com";
    const registrations = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    );
    const userReg = registrations.find((reg) => reg.email === userEmail);

    // Update last login time
    if (userReg) {
      userReg.lastLogin = new Date().toISOString();
      localStorage.setItem("registrations", JSON.stringify(registrations));
    }

    // Simulate loading user data
    setTimeout(() => {
      setUserData(
        userReg || {
          name: "John Doe",
          email: userEmail,
          ticketType: "VIP Pass",
          createdAt: new Date().toISOString(),
        }
      );
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleTileClick = (type) => {
    setTileLoading((prev) => ({ ...prev, [type]: true }));

    // Simulate loading content with different times
    const loadTime = type === "video" ? 1200 : type === "pdf" ? 800 : 500;

    setTimeout(() => {
      setActiveContent(type);
      setTileLoading((prev) => ({ ...prev, [type]: false }));
    }, loadTime);
  };

  const handleCloseIframe = () => {
    setActiveContent(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  const getContentUrl = (type) => {
    switch (type) {
      case "video":
        return videoUrl;
      case "pdf":
        return pdfUrl;
      case "feedback":
        return feedbackUrl;
      default:
        return "";
    }
  };

  const getContentTitle = (type) => {
    switch (type) {
      case "video":
        return "Event Videos - Tech Conference 2026";
      case "pdf":
        return "Event Resources & Materials";
      case "feedback":
        return "Event Feedback Form";
      default:
        return "Content Viewer";
    }
  };

  const getContentType = (type) => {
    if (type === "feedback") return "feedback";
    if (type === "video") return "video";
    if (type === "pdf") return "pdf";
    return "external";
  };

  // Get user's feedback stats
  const getFeedbackStats = () => {
    try {
      const feedbacks = JSON.parse(
        localStorage.getItem("eventFeedbacks") || "[]"
      );
      const userEmail = localStorage.getItem("userEmail") || "";
      const userFeedbacks = feedbacks.filter((fb) => fb.email === userEmail);

      return {
        count: userFeedbacks.length,
        lastSubmitted:
          userFeedbacks.length > 0
            ? new Date(
                userFeedbacks[userFeedbacks.length - 1].timestamp
              ).toLocaleDateString()
            : null,
        averageRating:
          userFeedbacks.length > 0
            ? (
                userFeedbacks.reduce(
                  (sum, fb) => sum + parseInt(fb.rating || 0),
                  0
                ) / userFeedbacks.length
              ).toFixed(1)
            : 0,
      };
    } catch (error) {
      return { count: 0, lastSubmitted: null, averageRating: 0 };
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  const feedbackStats = getFeedbackStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar variant="portal" />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Welcome Section with User Info */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, {userData?.name?.split(" ")[0] || "User"}!
                </h1>
                <p className="text-gray-600">
                  Access your event resources and exclusive content
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ticket Type</p>
                  <p className="font-semibold text-gray-800">
                    {userData?.ticketType || "General Admission"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Last Login
                  </p>
                  <p className="text-2xl font-bold text-gray-800">Just now</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-600 font-medium">
                    Event Access
                  </p>
                  <p className="text-2xl font-bold text-gray-800">30 Days</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">
                    Feedback Submitted
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-gray-800">
                      {feedbackStats.count}
                    </p>
                    {feedbackStats.averageRating > 0 && (
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">
                          {feedbackStats.averageRating}
                        </span>
                      </div>
                    )}
                  </div>
                  {feedbackStats.lastSubmitted && (
                    <p className="text-xs text-purple-500 mt-1">
                      Last: {feedbackStats.lastSubmitted}
                    </p>
                  )}
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Tiles Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Tile
              title="Event Videos"
              description="Watch keynote speeches and panel discussions from the Tech Conference 2026."
              iconType="video"
              onClick={() => handleTileClick("video")}
              loading={tileLoading.video}
            />

            <Tile
              title="PDF Resources"
              description="Access presentation slides, whitepapers, and event materials for download."
              iconType="pdf"
              onClick={() => handleTileClick("pdf")}
              loading={tileLoading.pdf}
            />

            <Tile
              title="Feedback Form"
              description="Share your experience and suggestions to help us improve future events."
              iconType="feedback"
              onClick={() => handleTileClick("feedback")}
              loading={tileLoading.feedback}
            />
          </div>

          {/* Video Preview Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Video className="w-6 h-6 mr-2 text-primary-600" />
              Featured Event Video
            </h3>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2">
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <img
                        src="https://img.youtube.com/vi/qcTG5NXzuR0/maxresdefault.jpg"
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 text-white">
                    <h4 className="text-2xl font-bold mb-4">
                      The Future of Technology
                    </h4>
                    <p className="text-gray-300 mb-6">
                      A comprehensive look at emerging tech trends, AI
                      advancements, and the future of digital innovation. Join
                      industry leaders as they share insights on the next decade
                      of technological evolution.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Duration: 12 minutes</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>Included with your registration</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTileClick("video")}
                      className="mt-6 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Full Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-6">
                  Our support team is available 24/7 to assist you with any
                  issues accessing the portal or its resources.
                </p>
                <Button onClick={handleLogout} variant="secondary">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-2">Event Status</p>
                <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-emerald-400 font-medium">
                    Active • Access until Dec 31, 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Iframe Modal */}
      <AnimatePresence>
        {activeContent && (
          <IframeView
            url={getContentUrl(activeContent)}
            title={getContentTitle(activeContent)}
            onClose={handleCloseIframe}
            type={getContentType(activeContent)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portal;
