import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminClassBooking from './AdminClassBookings';

const AdminClasses = () => {
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({ name: "", description: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleAddOrEditCourse = async () => {
    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/classes/${editingCourseId}`, courseData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/classes`, courseData);
      }
      setCourseData({ name: "", description: "", price: "" }); // Clear the input fields
      setIsEditing(false);
      setEditingCourseId(null); // Reset editing course ID
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEdit = (course) => {
    setCourseData(course);
    setEditingCourseId(course._id);
    setIsEditing(true);
  };

  const handleAddClassClick = () => {
    setCourseData({ name: "", description: "", price: "" }); // Clear the input fields
    setIsEditing(false);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/classes/${courseId}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage Classes</h2>
      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#courseModal"
        onClick={handleAddClassClick}
      >
        <i className="fas fa-plus me-2"></i>Add Class
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>${course.price}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(course)}
                  data-bs-toggle="modal"
                  data-bs-target="#courseModal"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(course._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AdminClassBooking />

      {/* Modal */}
      <div className="modal fade" id="courseModal" tabIndex="-1" aria-labelledby="courseModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="courseModalLabel">
                {isEditing ? "Edit Course" : "Add Course"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={courseData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={courseData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddOrEditCourse}
                data-bs-dismiss="modal"
              >
                {isEditing ? "Save Changes" : "Add Course"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClasses;
