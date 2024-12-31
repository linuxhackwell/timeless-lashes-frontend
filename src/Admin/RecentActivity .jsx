import React, { useState } from "react";
import "./Dashboard.css";
import axios from 'axios'

const RecentActivity = () => {
  const bookings = [
    { id: "B001", customer: "John Doe", service: "Eyelash Extension", date: "2024-11-20", time: "10:30 AM", status: "Completed" },
    { id: "B002", customer: "Jane Smith", service: "Lash Lift", date: "2024-11-22", time: "1:00 PM", status: "Pending" },
    // Add more sample bookings here
  ];


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.customer}</td>
                <td>{booking.service}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;
