import React from 'react';

const ServiceTable = ({ services, onEdit, onDelete }) => {
  if (!Array.isArray(services) || services.length === 0) {
    return <p className="text-center text-muted">No services available.</p>;
  }

  return (
    <div className="table-responsive m-3">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>Ksh.{service.price.toFixed(2)}</td>
              <td className="text-center">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(service)}
                >
                  <i className="bi bi-pencil-square"></i> Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(service._id)}
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

export default ServiceTable;
