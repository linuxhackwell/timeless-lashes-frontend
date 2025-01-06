import React from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/book-appointment");
  };

  return (
    <div
      className="hero-section text-center text-white d-flex align-items-center justify-content-center bg-primary"
      style={{
        height: "100vh",
        animation: "fadeIn 2s ease-in-out",
      }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold">Enhance Your Natural Beauty</h1>
        <p className="lead">
          Experience the art of luxury lash extensions with Timeless Lashes
        </p>
        <button
          className="btn btn-light btn-lg mt-3"
          onClick={handleRedirect}
        >
          Book Your Appointment
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
