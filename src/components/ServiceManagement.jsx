import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    // Fetch services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/services', { withCredentials: true });
                setServices(response.data);
            } catch (error) {
                toast.error('Failed to load services');
            }
        };
        fetchServices();
    }, []);

    // Save or update service
    const handleSaveService = async () => {
        try {
            if (currentService.id) {
                await axios.put(`http://localhost:5000/api/services/${currentService.id}`, currentService, {
                    withCredentials: true,
                });
                toast.success('Service updated successfully');
            } else {
                const response = await axios.post('http://localhost:5000/api/services', currentService, {
                    withCredentials: true,
                });
                setServices([...services, response.data]);
                toast.success('Service added successfully');
            }
            setShowModal(false);
        } catch (error) {
            toast.error('Failed to save service');
        }
    };

    // Delete a service
    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/services/${id}`, { withCredentials: true });
            setServices(services.filter(service => service.id !== id));
            toast.success('Service deleted successfully');
        } catch (error) {
            toast.error('Failed to delete service');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Service Management</h1>
            <Button className="mb-3" onClick={() => {
                setCurrentService({
                    name: '',
                    description: '',
                    price: '',
                    duration: '',
                    assignedEmployee: '',
                    isActive: true,
                });
                setShowModal(true);
            }}>
                Add New Service
            </Button>
            <Table striped bordered hover responsive>
                <thead className="bg-primary text-white">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Assigned Employee</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={service.id}>
                            <td>{index + 1}</td>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>${service.price}</td>
                            <td>{service.duration} mins</td>
                            <td>{service.assignedEmployee}</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    checked={service.isActive}
                                    onChange={async () => {
                                        const updatedService = { ...service, isActive: !service.isActive };
                                        await axios.put(`http://localhost:5000/api/services/${service.id}`, updatedService, {
                                            withCredentials: true,
                                        });
                                        setServices(services.map(s => (s.id === service.id ? updatedService : s)));
                                    }}
                                />
                            </td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => {
                                        setCurrentService(service);
                                        setShowModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteService(service.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Service Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentService?.id ? 'Edit Service' : 'Add Service'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentService?.name || ''}
                                onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={currentService?.description || ''}
                                onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentService?.price || ''}
                                onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="number"
                                value={currentService?.duration || ''}
                                onChange={(e) => setCurrentService({ ...currentService, duration: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assigned Employee</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentService?.assignedEmployee || ''}
                                onChange={(e) => setCurrentService({ ...currentService, assignedEmployee: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveService}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default ServiceManagement;
