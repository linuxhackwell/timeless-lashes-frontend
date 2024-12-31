import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { FaUser, FaPhone, FaCalendarAlt, FaPaperPlane } from "react-icons/fa";

const EnrollmentForm = ({ classDetails, onEnroll }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    contactInfo: "",
    selectedDate: "",
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.contactInfo || !formData.selectedDate) {
      setErrorMessage("All fields are required!");
      return;
    }
    setErrorMessage(null);

    // Simulate enrollment submission (can replace with API call)
    onEnroll(formData);
    setSuccessMessage("Enrollment successful! We'll contact you shortly.");
    setFormData({ studentName: "", contactInfo: "", selectedDate: "" });
  };

  return (
    <Card className="p-4 shadow-lg">
      <Card.Title className="text-center mb-4 text-primary">
        Enroll in <span className="fw-bold">{classDetails.name}</span>
      </Card.Title>
      <Form onSubmit={handleSubmit}>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        {/* Student Name */}
        <Form.Group className="mb-3">
          <Form.Label>
            <FaUser className="me-2 text-primary" />
            Your Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Contact Info */}
        <Form.Group className="mb-3">
          <Form.Label>
            <FaPhone className="me-2 text-primary" />
            Contact Information
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone or email"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Available Dates */}
        <Form.Group className="mb-3">
          <Form.Label>
            <FaCalendarAlt className="me-2 text-primary" />
            Select Date
          </Form.Label>
          <Form.Select
            name="selectedDate"
            value={formData.selectedDate}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose a date</option>
            {classDetails.availableDates.map((date, index) => (
              <option key={index} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button type="submit" className="btn btn-primary btn-lg">
            <FaPaperPlane className="me-2" />
            Enroll Now
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EnrollmentForm;
