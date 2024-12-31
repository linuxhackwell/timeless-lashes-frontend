import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave, faCamera } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [editingField, setEditingField] = useState("");
  const [updatedData, setUpdatedData] = useState({});
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(response.data);
        setUpdatedData(response.data);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    fetchAdmin();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleSave = async (field) => {
    try {
      const token = localStorage.getItem("adminToken");
      const updatedFieldData = { [field]: updatedData[field] };

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/admin/update`, updatedFieldData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmin((prev) => ({ ...prev, [field]: updatedData[field] }));
      setEditingField("");
    } catch (error) {
      console.error("Error updating admin details:", error);
    }
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleProfilePictureSave = async () => {
    if (!profilePictureFile) return;

    const formData = new FormData();
    formData.append("profilePicture", profilePictureFile);

    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAdmin((prev) => ({
        ...prev,
        profilePicture: response.data.admin.profilePicture,
      }));
      setProfilePictureFile(null);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  if (!admin) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4">
            <div className="text-center">
              <div className="position-relative">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${admin.profilePicture}`}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    border: "3px solid #6c757d",
                  }}
                />
                <label
                  htmlFor="profilePicture"
                  className="btn btn-sm btn-link text-primary position-absolute"
                  style={{ bottom: "10px", right: "10px" }}
                >
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  style={{ display: "none" }}
                  onChange={handleProfilePictureChange}
                />
              </div>
              <button
                className="btn btn-primary btn-sm mt-2"
                disabled={!profilePictureFile}
                onClick={handleProfilePictureSave}
              >
                <FontAwesomeIcon icon={faSave} /> Save Picture
              </button>
              <h3 className="mb-4">{admin.name}</h3>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Name:</strong>
                {editingField === "name" ? (
                  <div className="d-flex">
                    <input
                      type="text"
                      name="name"
                      value={updatedData.name}
                      onChange={handleChange}
                      className="form-control form-control-sm me-2"
                    />
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSave("name")}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                  </div>
                ) : (
                  <div>
                    {admin.name}
                    <button
                      className="btn btn-sm btn-link text-primary"
                      onClick={() => handleEdit("name")}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                )}
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Email:</strong>
                {editingField === "email" ? (
                  <div className="d-flex">
                    <input
                      type="email"
                      name="email"
                      value={updatedData.email}
                      onChange={handleChange}
                      className="form-control form-control-sm me-2"
                    />
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSave("email")}
                    >
                      <FontAwesomeIcon icon={faSave} />
                    </button>
                  </div>
                ) : (
                  <div>
                    {admin.email}
                    <button
                      className="btn btn-sm btn-link text-primary"
                      onClick={() => handleEdit("email")}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                )}
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>Role:</strong>
                {admin.role || "Administrator"}
              </li>
              <li className="list-group-item">
                <strong>Joined:</strong> {new Date(admin.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
