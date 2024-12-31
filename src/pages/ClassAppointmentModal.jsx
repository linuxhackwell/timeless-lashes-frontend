import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const ClassAppointmentModal = ({ toggleModal }) => {
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes`);
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data && Array.isArray(response.data.classes)) {
          setCourses(response.data.classes);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelection = (course) => {
    setSelectedCourse(course);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = async () => {
    if (!selectedCourse) {
      console.error("Course not selected");
      return;
    }

    const bookingDetails = {
      course: {
        name: selectedCourse.name,
        price: selectedCourse.price,
      },
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      message: formData.message || "",
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings/class-bookings`,
        bookingDetails
      );
      if (response.status === 201) {
        console.log("Class booking successfully created:", response.data);
        //alert("Booking confirmed!");
        toggleModal();
        navigate("/")
      } else {
        console.error("Failed to create class booking");
      }
    } catch (error) {
      console.error("Error occurred while creating class booking:", error);
    }
  };

  if (loading) {
    return (
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body text-center py-5">Loading courses...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body text-center py-5 text-danger">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {step === 1
                ? "Choose a Course"
                : step === 2
                ? "Enter Your Details"
                : "Confirm Booking"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={toggleModal}
            ></button>
          </div>
          <div className="modal-body">
            {step === 1 && (
              <>
                <p className="mb-3">Select a course to book:</p>
                <ul className="list-group">
                  {courses.map((course) => (
                    <li
                      key={course.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{course.name}</span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleCourseSelection(course)}
                      >
                        Select
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {step === 2 && (
              <>
                <p className="mb-3">Enter your details below:</p>
                <form>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </form>
              </>
            )}
            {step === 3 && (
              <>
                <p className="mb-3">Review your booking details:</p>
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Course:</strong> {selectedCourse.name}
                  </li>
                  <li className="list-group-item">
                    <strong>Price:</strong> {selectedCourse.price}
                  </li>
                  <li className="list-group-item">
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> {formData.email}
                  </li>
                  <li className="list-group-item">
                    <strong>Phone:</strong> {formData.phone}
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="modal-footer">
            {step === 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleModal}
              >
                Cancel
              </button>
            )}
            {step === 2 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStep(3)}
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleConfirm}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAppointmentModal;
