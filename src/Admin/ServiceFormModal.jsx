import React, { useState } from 'react';
import axios from 'axios';

const ServiceFormModal = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || '',
    image: null, // For the image file
  });

  const [previewImage, setPreviewImage] = useState(
    service?.image
      ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${service.image}`
      : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (service) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/services/${service._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/services`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{service ? 'Edit Service' : 'Add New Service'}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="serviceName" className="form-label">
                  Service Name
                </label>
                <input
                  type="text"
                  id="serviceName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter service name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="serviceDescription" className="form-label">
                  Description
                </label>
                <textarea
                  id="serviceDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                  placeholder="Enter service description"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="servicePrice" className="form-label">
                  Price (in USD)
                </label>
                <input
                  type="number"
                  id="servicePrice"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="serviceImage" className="form-label">
                  Service Image
                </label>
                <input
                  type="file"
                  id="serviceImage"
                  name="image"
                  onChange={handleFileChange}
                  className="form-control"
                  accept="image/*"
                />
                {previewImage && (
                  <div className="mt-3">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ width: '150px', height: 'auto' }}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFormModal;
