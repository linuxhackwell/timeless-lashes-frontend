import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const sanitizedValue = e.target.value.replace(/[<>]/g, ""); // Input sanitization
    setFormData({ ...formData, [e.target.name]: sanitizedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, formData);

      if (response.data.success) {
        const { token } = response.data;

        // Save token and expiration time to localStorage
        const expirationTime = Date.now() + 3 * 60 * 60 * 1000; // 3 hours in milliseconds
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminTokenExpiration", expirationTime);

        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/admin/dashboard"), 3000);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4">Admin Login</h3>
            <form onSubmit={handleSubmit}>
              {successMessage && (
                <div className="alert alert-success text-center mb-3">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-danger text-center mb-3">
                  {errorMessage}
                </div>
              )}
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <i className="fas fa-spinner fa-spin"></i> Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
