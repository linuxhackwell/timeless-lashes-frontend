import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointments.css";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterService, setFilterService] = useState("All");
  const [sortDateOrder, setSortDateOrder] = useState("Nearest");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`);

        // Handle empty appointments array
        if (response.data.length === 0) {
          setError("No bookings available at this time.");
        } else {
          setAppointments(response.data);
          setError(""); // Clear any prior error
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Update appointment status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/${id}`, {
        status: newStatus,
      });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again later.");
    }
  };

  // Format date to "Wed, 27th Nov"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
    const dayOfMonth = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);

    const suffix =
      dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31
        ? "st"
        : dayOfMonth === 2 || dayOfMonth === 22
        ? "nd"
        : dayOfMonth === 3 || dayOfMonth === 23
        ? "rd"
        : "th";

    return `${day}, ${dayOfMonth}${suffix} ${month}`;
  };

  // Sorting and filtering logic
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortDateOrder === "Nearest" ? dateA - dateB : dateB - dateA;
  });

  const filteredAppointments = sortedAppointments.filter((appointment) => {
    const matchesSearch = appointment.customerName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || appointment.status === filterStatus;
    const matchesService =
      filterService === "All" || appointment.service?.name === filterService;

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="appointments-page">
      <div className="filters-container d-flex flex-wrap align-items-center">
        {/* Search Bar */}
        <input
          type="text"
          className="form-control search-bar"
          placeholder="Search by client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="filters-wrapper d-flex">
          {/* Filter by Status */}
          <select
            className="form-control filter-dropdown"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          {/* Filter by Service */}
          <select
            className="form-control filter-dropdown"
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
          >
            <option value="All">All Services</option>
            <option value="Classic Lash">Classic Lash</option>
            <option value="Hybrid Lashes">Hybrid Lashes</option>
            <option value="Volume Lashes">Volume Lashes</option>
            <option value="Mega Volume Lashes">Mega Volume Lashes</option>
            <option value="All Lash Fills">All Lash Fills</option>
            <option value="Lash Removal">Lash Removal</option>
          </select>

          {/* Sort by Date */}
          <select
            className="form-control filter-dropdown"
            value={sortDateOrder}
            onChange={(e) => setSortDateOrder(e.target.value)}
          >
            <option value="Nearest">Nearest Dates</option>
            <option value="Farthest">Farthest Dates</option>
          </select>
        </div>
      </div>

      {/* Appointments Table */}
      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredAppointments.length === 0 ? (
        <div className="no-appointments-icon">
          <i className="fas fa-calendar-times"></i>
          <p>No appointments available at this time.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>
                  <td>{appointment.customerName || "Unknown"}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.timeSlot}</td>
                  <td>{appointment.service?.name || "Unknown Service"}</td>
                  <td>
                    <span
                      className={`badge ${
                        appointment.status === "Confirmed"
                          ? "bg-success"
                          : appointment.status === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm status-dropdown"
                      value={appointment.status}
                      onChange={(e) => updateStatus(appointment._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
