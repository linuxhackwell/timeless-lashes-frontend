import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Spinner, Form } from "react-bootstrap";
import { FaCheckCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(""); // User's email or phone number
  const [appointments, setAppointments] = useState([]); // Appointment details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [totalDeposit, setTotalDeposit] = useState(0); // Total deposit

  // Check if booking data was passed during redirection
  useEffect(() => {
    if (location.state?.booking) {
      const booking = location.state.booking;
      setAppointments([booking]);
      setTotalDeposit(booking.noOfPersons * 2000); // Calculate deposit
    }
  }, [location.state]);

  // Function to fetch appointment based on userId (email or phone)
  const fetchAppointments = async () => {
    if (!userId) {
      setError("Please enter an email or phone number");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/${userId}`);
      const appointmentsData = response.data;

      setAppointments(appointmentsData);
      // Calculate total deposit
      const total = appointmentsData.reduce((sum, appointment) => sum + (appointment.noOfPersons || 1) * 2000, 0);
      setTotalDeposit(total);
    } catch (err) {
      setError("Failed to load appointment details");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to the checkout page
  const handleCheckout = () => {
    navigate("/book-appointment/checkout", { state: { appointments, totalDeposit } }); };

return ( 
<div className="cart-container py-5"> 
  <Row className="justify-content-center"> 
    <Col md={8}> <Form.Group controlId="userId"> 
      <Form.Label>Enter Email or Phone Number</Form.Label> 
      <Form.Control type="text" placeholder="Email or Phone Number" value={userId} onChange={(e) => setUserId(e.target.value)} /> 
        <Button variant="primary" onClick={fetchAppointments} className="mt-2"> Search Appointments </Button> 
      </Form.Group>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      )}

      {error && <div className="text-center text-danger">{error}</div>}

      {appointments.length > 0 && !loading && !error && (
        <div className="appointments-list mt-4">
          {appointments.map((appointment, index) => (
            <Card key={index} className="shadow-lg rounded-3 mb-4">
              <Card.Header as="h5" className="bg-primary text-white">
                <FaCheckCircle /> Appointment #{index + 1}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p><strong>Service:</strong> {appointment.service?.name || "N/A"}</p>
                    <p><strong>Employee:</strong> {appointment.employee?.name || "N/A"}</p>
                    <p><strong>Date:</strong> {appointment.date || "N/A"}</p>
                    <p><strong>Time:</strong> {appointment.timeSlot || "N/A"}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Name:</strong> {appointment.customerName || "N/A"}</p>
                    <p><strong>Email:</strong> {appointment.customerEmail || "N/A"}</p>
                    <p><strong>Phone:</strong> {appointment.customerPhone || "N/A"}</p>
                    <p><strong>No. of Persons:</strong> {appointment.noOfPersons || 1}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <h5>Total Deposit: KES {totalDeposit.toLocaleString()}</h5>
            <Button variant="success" size="lg" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Col>
  </Row>
</div>
); 

};

export default Cart;
