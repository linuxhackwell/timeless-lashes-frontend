import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    // Get the admin details from localStorage during initialization
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const storedAdmin = localStorage.getItem("admin");
        if (!storedAdmin) {
          // Fetch admin details if not in localStorage
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/profile`);
          const adminData = response.data;

          // Store the data in localStorage for future use
          localStorage.setItem("admin", JSON.stringify(adminData));
          setAdmin(adminData);
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const updateAdmin = (updatedData) => {
    // Update admin details in both state and localStorage
    setAdmin(updatedData);
    localStorage.setItem("admin", JSON.stringify(updatedData));
  };

  const logoutAdmin = () => {
    // Clear admin data from localStorage and state
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, updateAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
