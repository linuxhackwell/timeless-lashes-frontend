import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ServicesSection.css'; // Add custom styling
import 'bootstrap/dist/css/bootstrap.min.css';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleRedirect = () => {
    navigate('/book-appointment'); // Redirect to the booking page
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="services-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 service-card-sections">
                {/* Construct image URL */}
                <div
                  className="service-image"
                  style={{
                    backgroundImage: `url(${import.meta.env.VITE_API_BASE_URL}/uploads/${service.image})`, // Use the exact path
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px',
                  }}
                ></div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{service.name}</h5>
                  <p className="card-text">{service.description}</p>
                  <p className="fw-bold text-primary">{service.price} Ksh</p>
                  <button className="btn btn-outline-primary" onClick={handleRedirect}>Select Service</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
