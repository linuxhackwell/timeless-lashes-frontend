import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "./Dashboard.css"; // Custom CSS

const Dashboard = () => {
  // State for data
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`);
      setAppointments(response.data); // Handle appointments even if empty
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments. Please try again later.");
    }
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch revenue
  const fetchRevenue = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/revenue`);
      setRevenue(response.data.totalRevenue);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/analytics`);
      setAnalytics(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchServices(),
          fetchAppointments(),
          fetchEmployees(),
          fetchRevenue(),
          fetchAnalytics(),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Conditional Rendering
  if (loading) {
    return <p className="text-center">Loading dashboard data...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="dashboard-container d-flex">
      <div className="dashboard-main-content flex-grow-1">
        <Header />
        <div className="dashboard-content container mt-4">
          {/* Summary Cards */}
          <div className="row">
            <div className="col-md-3">
              <div className="dashboard-card dashboard-card-primary">
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">Total Appointments</h5>
                  <p className="dashboard-card-text">
                    {appointments.length > 0 ? appointments.length : "0"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="dashboard-card dashboard-card-success">
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">Total Revenue</h5>
                  <p className="dashboard-card-text">Ksh {revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="dashboard-card dashboard-card-warning">
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">Services</h5>
                  <p className="dashboard-card-text">{services.length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="dashboard-card dashboard-card-danger">
                <div className="dashboard-card-body">
                  <h5 className="dashboard-card-title">Employees</h5>
                  <p className="dashboard-card-text">{employees.length}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Graph Section */}
          <div className="dashboard-graph-card card mt-4">
            <div className="card-body">
              <h5 className="dashboard-graph-title">Analytics Overview</h5>
              {analytics.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.map((metric, index) => (
                      <tr key={index}>
                        <td>{metric.label}</td>
                        <td>{metric.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No analytics data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
