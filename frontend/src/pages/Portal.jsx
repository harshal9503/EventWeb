import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, FileText, MessageSquare, LogOut, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Tile from "../components/Tile";
import IframeView from "../components/IframeView";
import Loader, { PageLoader } from "../components/Loader";

const Portal = () => {
  const [activeContent, setActiveContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tileLoading, setTileLoading] = useState({
    video: false,
    pdf: false,
    feedback: false,
  });

  // Demo URLs
  const contentUrls = {
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    feedback:
      "https://docs.google.com/forms/d/e/1FAIpQLSfExample/viewform?embedded=true",
  };

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleTileClick = (type) => {
    setTileLoading((prev) => ({ ...prev, [type]: true }));

    // Simulate loading content
    setTimeout(() => {
      setActiveContent(type);
      setTileLoading((prev) => ({ ...prev, [type]: false }));
    }, 1500);
  };

  const handleCloseIframe = () => {
    setActiveContent(null);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar variant="portal" />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl mb-6"
            >
              <Video className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your Event Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access exclusive event content, resources, and share your feedback
            </p>
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
                  <p className="text-2xl font-bold text-gray-800">
                    Today, 10:30 AM
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Video className="w-6 h-6 text-blue-600" />
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
                    Resources Accessed
                  </p>
                  <p className="text-2xl font-bold text-gray-800">8 Files</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <FileText className="w-6 h-6 text-emerald-600" />
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
                  <p className="text-2xl font-bold text-gray-800">3 Times</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Tiles Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <Tile
              title="Event Videos"
              description="Watch recorded sessions, keynote speeches, and panel discussions from the event."
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

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
                <p className="text-gray-300 mb-6">
                  Our support team is available 24/7 to assist you with any
                  issues accessing the portal or its resources.
                </p>
                <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  Contact Support
                </button>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-2">Event Status</p>
                <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-emerald-400 font-medium">
                    Active • 30 days remaining
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
            url={contentUrls[activeContent]}
            title={
              activeContent === "video"
                ? "Event Videos"
                : activeContent === "pdf"
                ? "PDF Resources"
                : "Feedback Form"
            }
            onClose={handleCloseIframe}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portal;
