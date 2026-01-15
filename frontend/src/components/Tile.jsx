import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PlayCircle,
  FileText,
  MessageSquare,
  ExternalLink,
  Loader2,
  Star,
  Download,
} from "lucide-react";

const Tile = ({
  title,
  description,
  iconType = "video",
  onClick,
  loading = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const icons = {
    video: PlayCircle,
    pdf: FileText,
    feedback: MessageSquare,
  };

  const colors = {
    video: "from-red-500 to-orange-500",
    pdf: "from-emerald-500 to-teal-500",
    feedback: "from-purple-500 to-pink-500",
  };

  const buttonText = {
    video: "Watch Video",
    pdf: "View PDF",
    feedback: "Submit Feedback",
  };

  const Icon = icons[iconType];

  return (
    <motion.div
      className="card cursor-pointer group relative overflow-hidden"
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={!loading ? onClick : undefined}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
      )}

      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${colors[iconType]} opacity-0 group-hover:opacity-10 blur transition-opacity duration-300`}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${colors[iconType]}`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          {iconType === "feedback" && (
            <div className="flex items-center text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm font-medium">Important</span>
            </div>
          )}
          {iconType === "pdf" && (
            <Download className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          )}
          {iconType === "video" && (
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-primary-600 font-medium">
            <span>{buttonText[iconType]}</span>
            <motion.div
              className="ml-2"
              animate={isHovered ? { x: 5 } : { x: 0 }}
            >
              →
            </motion.div>
          </div>

          {iconType === "pdf" && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              2.1 MB
            </span>
          )}

          {iconType === "video" && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              12 min
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Tile;
