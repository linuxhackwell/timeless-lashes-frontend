import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Timelesslashes.jpg'; // Import the logo

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook for location

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  // Function to handle redirection to the booking page
  const handleRedirect = () => {
    navigate('/book-appointment'); // Redirect to the booking page
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            {/* Image placeholder for Timeless Lashes */}
            <img
              src={logo}
              alt="Timeless Lashes Logo"
              style={{
                height: '40px',
                width: '40px',
                borderRadius: '50%',
                marginRight: '10px',
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aftercare">
                  Aftercare & Maintenance
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/classes">
                  Classes
                </Link>
              </li>
            </ul>
            {/* Button to redirect directly to the booking page */}
            <button
              className="btn btn-primary ms-3"
              onClick={handleRedirect}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
