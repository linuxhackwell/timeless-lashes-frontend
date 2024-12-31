import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    // Fetch employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/employees`, { withCredentials: true });
                setEmployees(response.data);
            } catch (error) {
                toast.error('Failed to load employees');
            }
        };
        fetchEmployees();
    }, []);

    // Save or update employee
    const handleSaveEmployee = async () => {
        try {
            if (currentEmployee.id) {
                await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/employees/${currentEmployee.id}`, currentEmployee, {
                    withCredentials: true,
                });
                toast.success('Employee updated successfully');
            } else {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/employees`, currentEmployee, {
                    withCredentials: true,
                });
                setEmployees([...employees, response.data]);
                toast.success('Employee added successfully');
            }
            setShowModal(false);
        } catch (error) {
            toast.error('Failed to save employee');
        }
    };

    // Delete an employee
    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/employees/${id}`, { withCredentials: true });
            setEmployees(employees.filter(employee => employee.id !== id));
            toast.success('Employee deleted successfully');
        } catch (error) {
            toast.error('Failed to delete employee');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Employee Management</h1>
            <Button className="mb-3" onClick={() => {
                setCurrentEmployee({
                    name: '',
                    profilePicture: '',
                    contactInfo: '',
                    assignedServices: [],
                    workSchedule: {},
                });
                setShowModal(true);
            }}>
                Add New Employee
            </Button>
            <Table striped bordered hover responsive>
                <thead className="bg-primary text-white">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Profile Picture</th>
                        <th>Contact Info</th>
                        <th>Assigned Services</th>
                        <th>Work Schedule</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{index + 1}</td>
                            <td>{employee.name}</td>
                            <td>
                                <img src={employee.profilePicture} alt={employee.name} style={{ width: '50px', borderRadius: '50%' }} />
                            </td>
                            <td>{employee.contactInfo}</td>
                            <td>{employee.assignedServices.join(', ')}</td>
                            <td>
                                {Object.entries(employee.workSchedule).map(([day, time]) => (
                                    <div key={day}>
                                        <strong>{day}:</strong> {time}
                                    </div>
                                ))}
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => {
                                        setCurrentEmployee(employee);
                                        setShowModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteEmployee(employee.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Employee Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentEmployee?.id ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentEmployee?.name || ''}
                                onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Picture URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentEmployee?.profilePicture || ''}
                                onChange={(e) => setCurrentEmployee({ ...currentEmployee, profilePicture: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentEmployee?.contactInfo || ''}
                                onChange={(e) => setCurrentEmployee({ ...currentEmployee, contactInfo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assigned Services</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentEmployee?.assignedServices?.join(', ') || ''}
                                onChange={(e) => setCurrentEmployee({
                                    ...currentEmployee,
                                    assignedServices: e.target.value.split(',').map(service => service.trim()),
                                })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Work Schedule</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={
                                    currentEmployee?.workSchedule
                                        ? Object.entries(currentEmployee.workSchedule)
                                              .map(([day, time]) => `${day}: ${time}`)
                                              .join('\n')
                                        : ''
                                }
                                onChange={(e) => {
                                    const schedule = e.target.value.split('\n').reduce((acc, line) => {
                                        const [day, ...time] = line.split(':');
                                        if (day && time.length) {
                                            acc[day.trim()] = time.join(':').trim();
                                        }
                                        return acc;
                                    }, {});
                                    setCurrentEmployee({ ...currentEmployee, workSchedule: schedule });
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEmployee}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default EmployeeManagement;
