import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Classes = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // State to hold courses
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/classes`);

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setCourses(response.data); // Use the array directly
        } else if (response.data && Array.isArray(response.data.classes)) {
          setCourses(response.data.classes); // Adjust if data is nested
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="container py-5 text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="container py-5 text-center text-danger">{error}</div>;
  }

  return (
    <div className="container py-5 h-100">
      <h2 className="text-center mb-4">Eye Extension Classes</h2>
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <div className="col-md-4 mb-4" key={course.id || index}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">
                    Course {index + 1}: {course.name}
                  </h5>
                  <p className="card-text">{course.description}</p>
                  <p className="text-muted">
                    <strong>Price:</strong> Ksh {course.price.toLocaleString()}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/classes/${course.id || course.name.trim().replace(/\s+/g, "-").toLowerCase()}`)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No courses available</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
