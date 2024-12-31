import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/Timelesslashes.jpg";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setActiveLink(path || "dashboard");
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/logout`, {}, { withCredentials: true });
      window.location.href = "/admin/login"; // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAdminRoute) return null; // Hide Navbar on non-admin routes

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Timeless Lashes Logo"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <strong>Timeless Lashes</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === "dashboard" ? "active" : ""}`} to="/admin/dashboard">
                <i className="fas fa-tachometer-alt me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === "appointments" ? "active" : ""}`} to="/admin/appointments">
                <i className="fas fa-calendar-alt me-2"></i> Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === "services" ? "active" : ""}`} to="/admin/services">
                <i className="fas fa-briefcase me-2"></i> Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === "employees" ? "active" : ""}`} to="/admin/employees">
                <i className="fas fa-users me-2"></i> Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${activeLink === "classes" ? "active" : ""}`} to="/admin/classes">
                <i className="fas fa-chalkboard-teacher me-2"></i> Classes
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-user-circle me-2"></i> Admin
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/admin/profile">
                    <i className="fas fa-user me-2"></i> Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
