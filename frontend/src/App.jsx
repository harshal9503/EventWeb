import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import { PageLoader } from "./components/Loader";

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on app load
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

    setIsUserAuthenticated(userLoggedIn);
    setIsAdminAuthenticated(adminLoggedIn);
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return <PageLoader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsUserAuthenticated={setIsUserAuthenticated} />}
          />

          <Route
            path="/portal"
            element={
              <ProtectedRoute isAuthenticated={isUserAuthenticated}>
                <Portal />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/login"
            element={
              <AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute isAuthenticated={isAdminAuthenticated}>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const ProtectedAdminRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default App;
