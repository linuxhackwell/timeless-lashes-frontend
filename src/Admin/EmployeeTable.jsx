import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!Array.isArray(employees) || employees.length === 0) {
    return <p className="text-center text-muted">No employees found.</p>;
  }

  return (
    <div className="table-responsive m-3">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service(s)</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.assignedServices?.join(', ')}</td>
              <td className="text-center">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(employee)}
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(employee._id)}
                >
                  <i className="bi bi-trash-fill"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;