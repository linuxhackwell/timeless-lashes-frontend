import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroImage from "../assets/Timelesslashes.jpg"; // Import image directly

const HeroSection = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/book-appointment");
  };

  return (
    <div>
      <div
      className="hero-section text-center text-white d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `rgba(0, 0, 0, 0.5) url(${HeroImage}) center center / cover no-repeat`,
          zIndex: 1,
        }}
      ></div>

      <div className="hero-content" style={{ zIndex: 2 }}>
        <h1>Your Hero Title</h1>
        <p>Your Hero Subtitle</p>
      </div>
    </div>

    <div className="container mt-5">
      <h1 className="display-4 fw-bold">Enhance Your Natural Beauty</h1>
      <p className="lead">
        Experience the art of luxury lash extensions with Timeless Lashes
      </p>
      <button
        className="btn btn-primary btn-lg mt-3"
        onClick={handleRedirect}
      >
        Book Your Appointment
      </button>
    </div>
    </div>
  );
};

export default HeroSection;
