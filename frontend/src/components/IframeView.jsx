import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  FileText,
  MessageSquare,
  Play,
  Star,
  Send,
  CheckCircle,
} from "lucide-react";

const IframeView = ({ url, title, onClose, type = "external" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    message: "",
    category: "general",
    recommendation: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !feedbackData.name ||
      !feedbackData.email ||
      rating === 0 ||
      !feedbackData.message
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Get user email from localStorage
    const userEmail = localStorage.getItem("userEmail") || feedbackData.email;
    const feedbacks = JSON.parse(
      localStorage.getItem("eventFeedbacks") || "[]"
    );

    const newFeedback = {
      name: feedbackData.name,
      email: userEmail,
      rating: rating,
      category: feedbackData.category,
      message: feedbackData.message,
      recommendation: feedbackData.recommendation,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    };

    feedbacks.push(newFeedback);
    localStorage.setItem("eventFeedbacks", JSON.stringify(feedbacks));

    setFeedbackSubmitted(true);

    // Auto close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({ ...prev, [name]: value }));
  };

  const renderFeedbackForm = () => {
    if (feedbackSubmitted) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
          <div className="text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Your feedback has been submitted successfully. We truly appreciate
              your time and valuable input!
            </p>
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Your rating: {rating}/5 stars
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              This window will close automatically...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-gray-50 to-white p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Event Feedback Form</h2>
                  <p className="text-purple-100">
                    Share your experience to help us improve
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={feedbackData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={
                      feedbackData.email ||
                      localStorage.getItem("userEmail") ||
                      ""
                    }
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Rating Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Overall Rating *
                </label>
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-4xl transition-transform hover:scale-110"
                    >
                      <Star
                        className={`
                          ${
                            (hoverRating || rating) >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        `}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
                {rating > 0 && (
                  <p className="mt-2 text-sm text-purple-600 font-medium">
                    You rated: {rating} star{rating > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Category *
                </label>
                <select
                  name="category"
                  value={feedbackData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                >
                  <option value="general">General Feedback</option>
                  <option value="content">Content & Sessions</option>
                  <option value="speakers">Speakers Quality</option>
                  <option value="organization">Event Organization</option>
                  <option value="venue">Venue & Facilities</option>
                  <option value="technical">Technical Experience</option>
                  <option value="networking">Networking Opportunities</option>
                </select>
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Would you recommend this event to others? *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      value: "definitely",
                      label: "Definitely",
                      color:
                        "bg-emerald-100 text-emerald-700 border-emerald-300",
                    },
                    {
                      value: "probably",
                      label: "Probably",
                      color: "bg-blue-100 text-blue-700 border-blue-300",
                    },
                    {
                      value: "maybe",
                      label: "Maybe",
                      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        feedbackData.recommendation === option.value
                          ? `${option.color} ring-2 ring-offset-1`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="recommendation"
                        value={option.value}
                        checked={feedbackData.recommendation === option.value}
                        onChange={handleInputChange}
                        className="sr-only"
                        required
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Feedback Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback Message *
                </label>
                <textarea
                  name="message"
                  value={feedbackData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  rows="5"
                  placeholder="Please share your detailed feedback, suggestions, or comments about the event..."
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Share what you liked, what could be improved, and any other
                  thoughts
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center text-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Feedback
                </button>
                <p className="mt-3 text-center text-sm text-gray-500">
                  Your feedback helps us improve future events. Thank you!
                </p>
              </div>
            </form>
          </div>

          {/* Demo Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Note:</span> This feedback form
              saves data to your browser's localStorage for demonstration
              purposes. In a real application, this would be sent to a server.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (type === "feedback") {
      return renderFeedbackForm();
    }

    if (hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
          <div className="text-center p-8 max-w-md">
            <FileText className="w-16 h-16 text-red-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Content Unavailable
            </h3>
            <p className="text-gray-600 mb-6">
              {type === "pdf"
                ? "The PDF file could not be loaded. Please try again later."
                : "The content could not be loaded. Please check your connection."}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    return (
      <iframe
        src={url}
        title={title}
        className="w-full h-full"
        onLoad={() => {
          setTimeout(() => setIsLoading(false), 500);
        }}
        onError={handleIframeError}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {type === "video" && <Play className="w-5 h-5 text-red-600" />}
              {type === "pdf" && <FileText className="w-5 h-5 text-blue-600" />}
              {type === "feedback" && (
                <MessageSquare className="w-5 h-5 text-purple-600" />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative h-[calc(90vh-80px)]">
            {isLoading && type !== "feedback" && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-3" />
                  <p className="text-gray-600">
                    {type === "video"
                      ? "Loading video..."
                      : type === "pdf"
                      ? "Loading PDF..."
                      : "Loading content..."}
                  </p>
                </div>
              </div>
            )}

            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IframeView;
