import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import ServiceTable from './ServiceTable'; // Table for displaying services
import ServiceFormModal from './ServiceFormModal'; // Modal for adding/editing services
import ConfirmationModal from './ConfirmationModal'; // Modal for confirming delete

const AdminServicesPage = () => {
  const [services, setServices] = useState([]); // State to hold the list of services
  const [currentService, setCurrentService] = useState(null); // For editing
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Fetch services from the backend on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services`); // Adjust the API URL if needed
      setServices(response.data); // Update the state with the fetched services
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddService = () => {
    setCurrentService(null); // Reset current service for adding
    setShowFormModal(true);
  };

  const handleEditService = (service) => {
    setCurrentService(service); // Set current service for editing
    setShowFormModal(true);
  };

  const handleDeleteService = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/services/${selectedServiceId}`);
      setServices(services.filter((service) => service._id !== selectedServiceId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <div className="admin-services-page">
      <button className="btn btn-primary mb-3 mx-3 mt-3" onClick={handleAddService}>
        Add New Service
      </button>
      <ServiceTable
        services={services} // Pass the services as a prop
        onEdit={handleEditService}
        onDelete={(id) => {
          setSelectedServiceId(id);
          setShowConfirmModal(true);
        }}
      />
      {showFormModal && (
        <ServiceFormModal
          service={currentService}
          onClose={() => setShowFormModal(false)}
          onSave={() => {
            setShowFormModal(false);
            fetchServices(); // Refresh services after adding/editing
          }}
        />
      )}
      {showConfirmModal && (
  <ConfirmationModal
    title="Confirm Deletion"
    message="Are you sure you want to delete this service ? This action cannot be undone."
    onConfirm={handleDeleteService}
    onCancel={() => setShowConfirmModal(false)}
  />
)}

    </div>
  );
};

export default AdminServicesPage;
