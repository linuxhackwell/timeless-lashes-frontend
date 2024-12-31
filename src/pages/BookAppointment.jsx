import React, { useState } from 'react';
import './BookAppointment.css';
import AppointmentModal from '../components/appointmentModal';

const BookAppointment = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleBookNow = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <div className="book-appointment">
      <div className="container text-center py-5">
        {/* Heading */}
        <h1 className="title display-4 fw-bold text-gradient">
          Book Your Appointment
        </h1>
        <p className="lead text-muted my-4">
          Thank you for choosing <strong>Timeless Lashes</strong> for your eyelash needs!
        </p>

        {/* Booking Information Section */}
        <div className="booking-info shadow p-4 rounded-3 bg-white">
          <h3 className="mb-3 text-primary">Booking Information</h3>
          <p className="text-muted">
            A mandatory <strong>non-refundable</strong> deposit of <span className="text-danger">Kes 2,000</span> is required for all appointments. For courses, the deposit is <span className="text-danger">Kes 15,000</span>.
          </p>
          <ul className="list-unstyled text-start">
            <li>
              <strong>Deposit Details:</strong> Secures your booking and will be deducted from the total service cost.
            </li>
            <li>
              <strong>Cancellation Policy:</strong> Deposits are <strong>non-refundable</strong> and <strong>non-transferable</strong>.
            </li>
            <li>
              <strong>Payment:</strong> Deposits can be paid securely online during booking.
            </li>
          </ul>
        </div>

        {/* Confirmation Policy */}
        <div className="confirmation-policy shadow p-4 mt-4 rounded-3 bg-white">
          <h3 className="mb-3 text-primary">Confirmation Calls & Text Messages</h3>
          <p className="text-muted">
            As a courtesy, we will send you a confirmation text, email, or call the business day prior to your appointment. 
            Please ensure to keep track of your appointment to avoid cancellation fees.
          </p>
        </div>

        {/* Booking Steps */}
        <div className="steps shadow p-4 mt-4 rounded-3 bg-white">
          <h3 className="mb-3 text-primary">Follow These Steps to Book</h3>
          <ol className="list-group list-group-numbered text-start">
            <li className="list-group-item">
              Enter the required booking details.
            </li>
            <li className="list-group-item">
            Make the deposit payment of <strong>Kes 2,000</strong> for the booking to <strong>(+254)-718-648-052</strong>.</li>
            <li className="list-group-item">
              A booking email will be sent to your email.
            </li>
            <li className="list-group-item">
            <strong>Reply the confirmation email with a screenshot showing the payment message from safaricom.</strong>
            </li>
          </ol>
          <p className="text-danger mt-3">*The booked appointments will be disgarded after 12 hours of failure to reply with the confirmation screenshot.*</p>
        </div>

        {/* Payment Details */}
        <div className="payment-details shadow p-4 mt-4 rounded-3 bg-white">
          <h3 className="mb-3 text-primary">Pay Deposit</h3>
          <p className="text-muted">Pay to: <span className="fw-bold text-dark">(+254)-718-648-052 – Timeless Lashes</span></p>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <button className="btn btn-primary btn-lg shadow" onClick={handleBookNow}>
            Click Here to Book Now
          </button>
        </div>
      </div>

      {/* Render Modal */}
      {showModal && <AppointmentModal show={showModal} onClose={handleCloseModal} />
}
    </div>
  );
};

export default BookAppointment;
