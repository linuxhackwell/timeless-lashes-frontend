import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // Add custom styles if needed
import 'bootstrap/dist/css/bootstrap.min.css';

const HeroSection = () => {

  const navigate = useNavigate();

    // Function to handle redirection to the booking page
    const handleRedirect = () => {
      navigate('/book-appointment'); // Redirect to the booking page
    };

  return (
    <div className="hero-section text-center text-white d-flex align-items-center" style={{ background: `url('src/assets/one.jpeg') center/cover no-repeat`, height: '100vh' }}>
      <div className="container">
        <h1 className="display-4 fw-bold">Enhance Your Natural Beauty</h1>
        <p className="lead">Experience the art of luxury lash extensions with Timeless Lashes</p>
        <button className="btn btn-primary btn-lg mt-3" onClick={handleRedirect}>Book Your Appointment</button>
      </div>
    </div>
  );
};

export default HeroSection;
