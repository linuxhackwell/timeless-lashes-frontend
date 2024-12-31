import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import EmployeeTable from './EmployeeTable';
import EmployeeFormModal from './EmployeeFormModal';
import ConfirmationModal from './ConfirmationModal';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/employees`); // Adjusted route
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setShowFormModal(true);
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setShowFormModal(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/employees/${selectedEmployeeId}`);
      setEmployees(employees.filter((emp) => emp._id !== selectedEmployeeId));
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="admin-employees">
      <button className="btn btn-primary mb-3 mx-3 mt-3" onClick={handleAddEmployee}>
        <i className="bi bi-person-plus-fill me-2"></i>Add New Employee
      </button>
      <EmployeeTable
        employees={employees}
        className="mt-3" // Add margin to the table wrapper or table directly
        onEdit={handleEditEmployee}
        onDelete={(id) => {
          setSelectedEmployeeId(id);
          setShowConfirmModal(true);
        }}
      />
      {showFormModal && (
        <EmployeeFormModal
          employee={currentEmployee}
          onClose={() => setShowFormModal(false)}
          onSave={() => {
            setShowFormModal(false);
            fetchEmployees();
          }}
        />
      )}
      {showConfirmModal && (
  <ConfirmationModal
    title="Confirm Deletion"
    message="Are you sure you want to delete this employee ? This action cannot be undone."
    onConfirm={handleDeleteEmployee}
    onCancel={() => setShowConfirmModal(false)}
  />
)}

    </div>
  );
};

export default AdminEmployees;
