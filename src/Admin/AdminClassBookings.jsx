import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Spinner } from "react-bootstrap";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/classBookings`);
        console.log(response.data); // Debug API response
        setBookings(response.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center text-danger">{error}</div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Manage Class Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.course?.name || "N/A"}</td>
                <td>
                  {booking.customer?.firstName || "Unknown"}{" "}
                  {booking.customer?.lastName || ""}
                </td>
                <td>{booking.customer?.email || "N/A"}</td>
                <td>{booking.customer?.phone || "N/A"}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleViewDetails(booking)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Course:</strong> {selectedBooking.course?.name || "N/A"}</p>
            <p><strong>Price:</strong> {selectedBooking.course?.price || "N/A"}</p>
            <p>
              <strong>Customer:</strong>{" "}
              {selectedBooking.customer?.firstName || "Unknown"}{" "}
              {selectedBooking.customer?.lastName || ""}
            </p>
            <p><strong>Email:</strong> {selectedBooking.customer?.email || "N/A"}</p>
            <p><strong>Phone:</strong> {selectedBooking.customer?.phone || "N/A"}</p>
            <p>
              <strong>Message:</strong>{" "}
              {selectedBooking.message || "No message provided"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AdminBookings;
