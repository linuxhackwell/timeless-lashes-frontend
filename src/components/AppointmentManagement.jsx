import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppointmentManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showNotesModal, setShowNotesModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [newNotes, setNewNotes] = useState('');

    // Fetch appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/appointments', { withCredentials: true });
                setAppointments(response.data);
            } catch (error) {
                toast.error('Failed to load appointments');
            }
        };
        fetchAppointments();
    }, []);

    // Update status
    const handleStatusUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/appointments/${selectedAppointment.id}/status`,
                { status: newStatus },
                { withCredentials: true }
            );
            setAppointments(prev =>
                prev.map(appt => (appt.id === selectedAppointment.id ? { ...appt, status: newStatus } : appt))
            );
            setShowStatusModal(false);
            toast.success('Status updated successfully');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    // Add notes
    const handleAddNotes = async () => {
        try {
            await axios.put(
                `http://localhost:5000/api/appointments/${selectedAppointment.id}/notes`,
                { notes: newNotes },
                { withCredentials: true }
            );
            setAppointments(prev =>
                prev.map(appt => (appt.id === selectedAppointment.id ? { ...appt, notes: newNotes } : appt))
            );
            setShowNotesModal(false);
            toast.success('Notes added successfully');
        } catch (error) {
            toast.error('Failed to add notes');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Appointment Management</h1>

            <Table striped bordered hover responsive>
                <thead className="bg-primary text-white">
                    <tr>
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt, index) => (
                        <tr key={appt.id}>
                            <td>{index + 1}</td>
                            <td>{appt.clientName}</td>
                            <td>{appt.date}</td>
                            <td>{appt.time}</td>
                            <td>{appt.service}</td>
                            <td>{appt.status}</td>
                            <td>{appt.notes || 'None'}</td>
                            <td>
                                <Button
                                    variant="success"
                                    onClick={() => {
                                        setSelectedAppointment(appt);
                                        setShowStatusModal(true);
                                    }}
                                    className="me-2"
                                >
                                    Edit Status
                                </Button>
                                <Button
                                    variant="info"
                                    onClick={() => {
                                        setSelectedAppointment(appt);
                                        setShowNotesModal(true);
                                    }}
                                >
                                    Add Notes
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Status Modal */}
            <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Appointment Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newStatus}
                                onChange={e => setNewStatus(e.target.value)}
                            >
                                <option>Pending</option>
                                <option>Confirmed</option>
                                <option>Completed</option>
                                <option>Cancelled</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleStatusUpdate}>
                        Update Status
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Notes Modal */}
            <Modal show={showNotesModal} onHide={() => setShowNotesModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Notes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newNotes}
                                onChange={e => setNewNotes(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowNotesModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddNotes}>
                        Add Notes
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default AppointmentManagement;
