import React, { useState } from 'react';

const BookingModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Book Appointment</h2>
        {/* Add booking form */}
        <button onClick={onClose} className="btn btn-secondary">Close</button>
      </div>
    </div>
  );
};

export default BookingModal;
