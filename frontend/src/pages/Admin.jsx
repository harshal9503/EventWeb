import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BarChart3,
  Download,
  Search,
  Filter,
  Eye,
  Shield,
  Clock,
  Calendar,
  Phone,
  Mail,
  User,
  Ticket,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Loader from "../components/Loader";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("registrations");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({
    ticketType: "",
    gender: "",
    status: "",
    dateRange: "all",
  });

  // Mock data
  const [registrations, setRegistrations] = useState([]);
  const [loginLogs, setLoginLogs] = useState([]);

  useEffect(() => {
    // Load mock data
    setTimeout(() => {
      const mockRegistrations = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `98765${String(10000 + i).slice(1)}`,
        gender: i % 3 === 0 ? "Male" : i % 3 === 1 ? "Female" : "Other",
        ticketType: ["General", "VIP", "Student", "Corporate"][i % 4],
        status: i % 10 === 0 ? "Blocked" : "Registered",
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        lastLogin: i % 3 === 0 ? new Date().toISOString() : null,
      }));

      const mockLogins = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        email: `user${(i % 10) + 1}@example.com`,
        loginTime: new Date(Date.now() - i * 3600000).toISOString(),
        device: ["Chrome", "Firefox", "Safari"][i % 3],
        ip: `192.168.${Math.floor(i / 256)}.${i % 256}`,
        activity:
          i % 5 === 0
            ? "Videos"
            : i % 5 === 1
            ? "PDF"
            : i % 5 === 2
            ? "Feedback"
            : "Portal Access",
      }));

      setRegistrations(mockRegistrations);
      setLoginLogs(mockLogins);
      setIsLoading(false);
    }, 2000);
  }, []);

  // Filter functions
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.phone.includes(searchTerm);

    const matchesFilters =
      (!selectedFilters.ticketType ||
        reg.ticketType === selectedFilters.ticketType) &&
      (!selectedFilters.gender || reg.gender === selectedFilters.gender) &&
      (!selectedFilters.status || reg.status === selectedFilters.status);

    return matchesSearch && matchesFilters;
  });

  const filteredLogins = loginLogs.filter((log) =>
    log.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(
    (activeTab === "registrations"
      ? filteredRegistrations.length
      : filteredLogins.length) / itemsPerPage
  );

  const currentData =
    activeTab === "registrations"
      ? filteredRegistrations.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : filteredLogins.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  // Stats calculation
  const stats = {
    totalRegistrations: registrations.length,
    activeUsers: registrations.filter((r) => r.status === "Registered").length,
    blockedUsers: registrations.filter((r) => r.status === "Blocked").length,
    totalLogins: loginLogs.length,
    uniqueLogins: new Set(loginLogs.map((l) => l.email)).size,
    todayLogins: loginLogs.filter(
      (l) => new Date(l.loginTime).toDateString() === new Date().toDateString()
    ).length,
  };

  const handleExportCSV = () => {
    const data =
      activeTab === "registrations" ? filteredRegistrations : filteredLogins;
    const headers =
      activeTab === "registrations"
        ? [
            "ID",
            "Name",
            "Email",
            "Phone",
            "Gender",
            "Ticket Type",
            "Status",
            "Created At",
          ]
        : ["ID", "Email", "Login Time", "Device", "IP", "Activity"];

    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        activeTab === "registrations"
          ? [
              row.id,
              row.name,
              row.email,
              row.phone,
              row.gender,
              row.ticketType,
              row.status,
              row.createdAt,
            ].join(",")
          : [
              row.id,
              row.email,
              row.loginTime,
              row.device,
              row.ip,
              row.activity,
            ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}_data.csv`;
    a.click();
  };

  const handleToggleStatus = (id) => {
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.id === id
          ? {
              ...reg,
              status: reg.status === "Registered" ? "Blocked" : "Registered",
            }
          : reg
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar variant="admin" />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <Loader size="large" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar variant="admin" />

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Registrations",
              value: stats.totalRegistrations,
              icon: Users,
              change: "+12%",
              trend: "up",
              color: "blue",
            },
            {
              title: "Active Users",
              value: stats.activeUsers,
              icon: Shield,
              change: "+5%",
              trend: "up",
              color: "green",
            },
            {
              title: "Total Logins",
              value: stats.totalLogins,
              icon: BarChart3,
              change: "+18%",
              trend: "up",
              color: "purple",
            },
            {
              title: "Today Logins",
              value: stats.todayLogins,
              icon: Clock,
              change: "-2%",
              trend: "down",
              color: "orange",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div
                  className={`flex items-center ${
                    stat.trend === "up" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {activeTab === "registrations"
                    ? "Registration Management"
                    : "Login Activity"}
                </h2>
                <p className="text-gray-400">
                  {activeTab === "registrations"
                    ? "Manage user registrations and access control"
                    : "Monitor user login activity and patterns"}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab("registrations");
                  setCurrentPage(1);
                }}
                className={`flex-1 px-6 py-4 font-medium text-sm ${
                  activeTab === "registrations"
                    ? "text-white border-b-2 border-primary-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Registrations ({registrations.length})</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab("logins");
                  setCurrentPage(1);
                }}
                className={`flex-1 px-6 py-4 font-medium text-sm ${
                  activeTab === "logins"
                    ? "text-white border-b-2 border-primary-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Login Activity ({loginLogs.length})</span>
                </div>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 bg-gray-750 border-b border-gray-700">
            <div className="flex flex-wrap gap-4">
              {activeTab === "registrations" && (
                <>
                  <select
                    value={selectedFilters.ticketType}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        ticketType: e.target.value,
                      }))
                    }
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="">All Ticket Types</option>
                    <option value="General">General</option>
                    <option value="VIP">VIP</option>
                    <option value="Student">Student</option>
                    <option value="Corporate">Corporate</option>
                  </select>

                  <select
                    value={selectedFilters.gender}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    value={selectedFilters.status}
                    onChange={(e) =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="">All Status</option>
                    <option value="Registered">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </>
              )}

              <select
                value={selectedFilters.dateRange}
                onChange={(e) =>
                  setSelectedFilters((prev) => ({
                    ...prev,
                    dateRange: e.target.value,
                  }))
                }
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <button
                onClick={() =>
                  setSelectedFilters({
                    ticketType: "",
                    gender: "",
                    status: "",
                    dateRange: "all",
                  })
                }
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-750">
                  {activeTab === "registrations" ? (
                    <>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        ID
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        User
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Contact
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Ticket Type
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Status
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Created
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Actions
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        ID
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        User
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Login Time
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Device
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        IP Address
                      </th>
                      <th className="py-4 px-6 text-left text-gray-300 font-medium">
                        Activity
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {currentData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-750/50 transition-colors"
                  >
                    {activeTab === "registrations" ? (
                      <>
                        <td className="py-4 px-6 text-gray-300">#{item.id}</td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-white">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {item.gender}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="w-3 h-3 mr-2 text-gray-400" />
                              <span className="text-gray-300">
                                {item.email}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="w-3 h-3 mr-2 text-gray-400" />
                              <span className="text-gray-400">
                                {item.phone}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              item.ticketType === "VIP"
                                ? "bg-purple-500/20 text-purple-300"
                                : item.ticketType === "Corporate"
                                ? "bg-blue-500/20 text-blue-300"
                                : item.ticketType === "Student"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-gray-500/20 text-gray-300"
                            }`}
                          >
                            <Ticket className="w-3 h-3 mr-1" />
                            {item.ticketType}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === "Registered"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {item.status === "Registered"
                              ? "Active"
                              : "Blocked"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-400 text-sm">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleToggleStatus(item.id)}
                              className={`px-3 py-1 text-sm rounded ${
                                item.status === "Registered"
                                  ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                                  : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                              }`}
                            >
                              {item.status === "Registered"
                                ? "Block"
                                : "Activate"}
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-6 text-gray-300">#{item.id}</td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-white">
                            {item.email}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="text-white">
                              {new Date(item.loginTime).toLocaleTimeString()}
                            </div>
                            <div className="text-sm text-gray-400">
                              {new Date(item.loginTime).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-500/20 text-gray-300">
                            {item.device}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-300 font-mono text-sm">
                          {item.ip}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-500/20 text-primary-300">
                            {item.activity}
                          </span>
                        </td>
                      </>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  activeTab === "registrations"
                    ? filteredRegistrations.length
                    : filteredLogins.length
                )}{" "}
                of{" "}
                {activeTab === "registrations"
                  ? filteredRegistrations.length
                  : filteredLogins.length}{" "}
                entries
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === pageNum
                          ? "bg-primary-500 text-white"
                          : "border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && (
                  <span className="px-2 text-gray-400">...</span>
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
