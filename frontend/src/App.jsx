import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/portal"
              element={
                <ProtectedRoute>
                  <Portal />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

// Mock authentication check (for static demo)
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const ProtectedAdminRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("adminLoggedIn") === "true";
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default App;
