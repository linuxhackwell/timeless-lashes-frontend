import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaConciergeBell, FaImage } from 'react-icons/fa';

const EmployeeFormModal = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    service: employee?.assignedServices?.join(', ') || '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('assignedServices', formData.service);
    if (formData.profilePicture) {
      data.append('profilePicture', formData.profilePicture);
    }

    try {
      if (employee) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/employees/${employee._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/employees`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5>{employee ? 'Edit Employee' : 'Add Employee'}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  <FaUser className="me-2" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>
                  <FaEnvelope className="me-2" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>
                  <FaPhone className="me-2" /> Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>
                  <FaConciergeBell className="me-2" /> Service(s)
                </label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="E.g., Classic Lash, Volume Lashes"
                />
              </div>

              <div className="mb-3">
                <label>
                  <FaImage className="me-2" /> Profile Picture
                </label>
                <input
                  type="file"
                  name="profilePicture"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormModal;
