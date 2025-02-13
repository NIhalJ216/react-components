import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import MenuManager from "../Pages/AdminOps/MenuManager";
import AdminDash from "../Pages/Dashboard/AdminDash";
import CustomerDash from "../Pages/Dashboard/CustomerDash";
import NotFound from "../Pages/Auth/NotFound";
import { PATHS } from "./Paths";

function ProtectedRoute({ element }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("UserDetails")); // Replace with actual auth logic
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function RoutePaths() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an authentication check (Replace with actual API call if needed)
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route path={PATHS.REGISTER} element={<Register />} />
      <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />

      {/* Protected Routes */}
      <Route
        path={PATHS.DASHBOARD}
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      <Route
        path={PATHS.HOME}
        element={<ProtectedRoute element={<Home />} />}
      />
      <Route
        path={PATHS.ABOUT}
        element={<ProtectedRoute element={<About />} />}
      />
      <Route
        path={PATHS.CONTACT}
        element={<ProtectedRoute element={<Contact />} />}
      />
      <Route
        path={PATHS.MENU_MANAGER}
        element={<ProtectedRoute element={<MenuManager />} />}
      />
      <Route
        path={PATHS.ADMIN_DASHBOARD}
        element={<ProtectedRoute element={<AdminDash />} />}
      />
      <Route
        path={PATHS.CUSTOMER_DASHBOARD}
        element={<ProtectedRoute element={<CustomerDash />} />}
      />
    </Routes>
  );
}

export default RoutePaths;
