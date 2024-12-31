import React, { useState } from 'react';
import Cart from '../pages/Cart';

const MockAppointment = () => {
  const [appointment, setAppointment] = useState({
    service: {
      name: "Classic Lash",
      description: "Natural, elegant lash extensions.",
      price: "5,500 Ksh",
      image: "src/assets/classic.jpeg",
    },
    employee: {
      name: "George",
      fee: 2000,
      image: "src/assets/george.jpeg",
    },
    date: "2024-11-26",
    time: "10:00 AM - 12:00 PM",
    people: 2,
    customer: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+254123456789",
    },
  });

  const handleCancel = () => {
    alert("Appointment Cancelled");
    // Logic for canceling the appointment
  };

  const handleEdit = () => {
    alert("Edit Appointment");
    // Logic for editing the appointment
  };

  return (
    <div>
      <Cart appointment={appointment} onCancel={handleCancel} onEdit={handleEdit} />
    </div>
  );
};

export default MockAppointment;
