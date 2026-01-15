import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  Video,
  FileText,
  MessageSquare,
  ArrowRight,
  Shield,
  BarChart,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Registration",
      description: "Quick and seamless event registration process",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "User Portal",
      description: "Personalized portal for registered attendees",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Protected content with secure authentication",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart,
      title: "Admin Dashboard",
      description: "Comprehensive analytics and management",
      color: "from-orange-500 to-red-500",
    },
  ];

  const resources = [
    {
      icon: Video,
      title: "Event Videos",
      description: "Access recorded sessions and presentations",
    },
    {
      icon: FileText,
      title: "PDF Materials",
      description: "Download event materials and resources",
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Share your experience and suggestions",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar variant="home" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Upcoming Event: Tech Conference 2026
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Experience Events
              </span>
              <br />
              <span className="text-gray-800">Like Never Before</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals in our premier event platform.
              Register, access exclusive content, and connect with industry
              leaders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="primary" className="text-lg px-8 py-4">
                  Register Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-4">
                  Access Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a seamless event experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group"
              >
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-4`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Exclusive Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access premium content available only to registered attendees
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 w-fit mb-6">
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <div className="flex items-center text-primary-600 font-medium">
                  <span>Available after registration</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Join the Event?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Don't miss out on this incredible opportunity. Register now and
              get access to all exclusive features.
            </p>
            <Link to="/register">
              <Button
                variant="secondary"
                className="text-lg px-8 py-4 bg-white text-primary-600 hover:bg-gray-100"
              >
                Get Your Ticket Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-8 h-8 text-primary-400" />
                <span className="text-2xl font-bold">EventHub</span>
              </div>
              <p className="text-gray-400">
                Professional Event Management Platform
              </p>
            </div>

            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/register"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/admin/login"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© 2026 EventHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
