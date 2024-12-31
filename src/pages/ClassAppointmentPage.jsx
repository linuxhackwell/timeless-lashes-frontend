import React, { useState } from "react";
import ClassAppointmentModal from "./ClassAppointmentModal";

const ClassAppointmentPage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Book Your Class</h1>
      <p className="text-muted text-center">
        Thank you for choosing Timeless Lashes for your professional training needs!
      </p>
      <div className="card p-4 shadow">
        <h3 className="mb-4">Booking Information</h3>
        <p>
          A mandatory non-refundable deposit of <strong>Kes 15,000</strong> is required for all class bookings.
        </p>
        <ul>
          <li>
            <strong>Deposit Details:</strong> Secures your booking and will be deducted from the total course cost.
          </li>
          <li>
            <strong>Cancellation Policy:</strong> Deposits are non-refundable and non-transferable.
          </li>
          <li>
            <strong>Payment:</strong> Deposits can be paid securely online during booking.
          </li>
        </ul>
        <h4>Confirmation Calls & Text Messages</h4>
        <p>
          As a courtesy, we will send you a confirmation text, email, or call the business day prior to your appointment. 
          Please ensure to keep track of your appointment to avoid cancellation fees.
        </p>
        <h5>Steps to Book</h5>
        <ol>
          <li>Enter the required booking details.</li>
          <li>Make the deposit payment of <strong>Kes 15,000</strong> for the booking to <strong>(+254)-718-648-052</strong>.</li>
          <li>Upon successful booking, a booking confirmation will be sent to your email.</li>
          <li><strong>Reply the confirmation email with a screenshot showing the payment message from safaricom.</strong></li>
        </ol>
        <p className="text-danger">
          <em>*The booked appointments will be disgarded after 24 hours of failure to reply with the confirmation screenshot.*</em>
        </p>
        <p className="text-danger">
        <em>*No deposit, no booking confirmation*</em>
        </p>
        <button className="btn btn-primary mt-3" onClick={toggleModal}>
          Book Classes
        </button>
      </div>
      {showModal && <ClassAppointmentModal toggleModal={toggleModal} />}
    </div>
  );
};

export default ClassAppointmentPage;
