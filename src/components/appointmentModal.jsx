import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Calendar from "react-calendar"; // Calendar library
import "react-calendar/dist/Calendar.css";
import "./AppointmentModal.css"; // Custom CSS
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons
import axios from 'axios'; // Import Axios for API requests



const timeSlots = ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM", "12:00 PM - 2:00 PM", "2:00 PM - 4:00 PM", "4:00 PM - 6:00 PM"];

const AppointmentModal = ({ show, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    people: 1,
    message: "",
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);


  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleServiceSelect = (service) => setSelectedService(service);
  const handleEmployeeSelect = (employee) => setSelectedEmployee(employee);

  const totalPrice = formData.people * (selectedEmployee?.fee || 2000);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false); // Spinner state

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Fetch employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/employees`); // Adjusted route
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const checkSlotAvailability = async (date) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/check-availability`, {
        date,
      });
  
      if (response.data?.bookedSlots) {
        setBookedSlots(response.data.bookedSlots);
      } else {
        setBookedSlots([]);
      }
    } catch (error) {
      console.error("Failed to fetch slot availability:", error);
      setBookedSlots([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    checkSlotAvailability(date);
    setSelectedTime(""); // Reset the selected time
  };
  
  const handleTimeClick = (time) => {
    if (bookedSlots.includes(time)) {
      alert("This time slot is already booked. Please select another.");
      return;
    }
    setSelectedTime(time);
  };  

  const handleConfirm = async () => {
    if (!selectedService || !selectedEmployee) {
      console.error("Service or employee not selected");
      return;
    }

    setIsLoading(true); // Show spinner

    // Include service details and employee fee
    const bookingDetails = {
      service: {
        name: selectedService.name,
        price: selectedService.price,
      },
      employee: {
        name: selectedEmployee.name,
        fee: selectedEmployee.fee,
      },
      date: selectedDate,
      timeSlot: selectedTime,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      numberOfPeople: formData.people,
      message: formData.message || "",
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, bookingDetails);
      if (response.status === 201) {
        //console.log("Booking successfully created:", response.data);
        //alert('Booking successful !');
        navigate("/"); // Navigate to cart
      } else {
        console.error("Failed to create booking");
      }
    } catch (error) {
      console.error("Error occurred while creating booking:", error);
    } finally {
      setIsLoading(false); // Hide spinner
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg"   className="custom-modal">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          {step === 1 && "Select a Service"}
          {step === 2 && "Choose Your Lash Artist"}
          {step === 3 && "Select Date and Time"}
          {step === 4 && "Enter Your Details"}
          {step === 5 && "Confirm Your Booking"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <Row id="card-flex" className="gy-3">
            {services.map((service, index) => (
              <Col md={6} className="d-flex justify-content-center" key={index}>
                <Card
                  className={`service-card ${selectedService === service ? "selected" : ""}`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="d-flex align-items-center">
                    {/* Radio Button */}
                    <Form.Check
                      type="radio"
                      name="service"
                      className="me-2"
                      checked={selectedService === service}
                      onChange={() => handleServiceSelect(service)}
                    />
                    <div className="card-image">
                      {/* Use proper concatenation for image URL */}
                      <img src={`${import.meta.env.VITE_API_BASE_URL}${service.image}`} alt={service.name} />
                    </div>
                  </div>
                  <Card.Body>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Card.Text className="fw-bold text-primary">
                    {`${service.price.toLocaleString()} Ksh`}
                  </Card.Text>
                </Card.Body>

                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Step 2: Employee Selection */}
        {step === 2 && (
          <Row className="gy-3">
            {employees.map((employee, index) => (
              <Col md={6} className="d-flex justify-content-center" key={index}>
                <Card
                  className={`service-card ${selectedEmployee === employee ? "selected" : ""}`}
                  onClick={() => handleEmployeeSelect(employee)}
                >
                  <div className="d-flex align-items-center">
                    {/* Radio Button */}
                    <Form.Check
                      type="radio"
                      name="employee"
                      className="me-2"
                      checked={selectedEmployee === employee}
                      onChange={() => handleEmployeeSelect(employee)}
                    />
                    <div className="card-image">
              {/* Correctly build the image URL */}
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}${employee.profilePicture}`}
                alt={employee.name}
              />
            </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{employee.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}


{step === 3 && (
  <Row>
    <Col md={8}>
      <h5>Select a Date</h5>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
        className="mb-4"
      />
    </Col>
    <Col md={4}>
      <h5>Select a Time Slot</h5>
      {loading ? (
        <p className="text-center">Loading available slots...</p>
      ) : (
        <>
          {/* Display all time slots */}
          {timeSlots.map((time, index) => {
            const isBooked = bookedSlots.includes(time); // Check if slot is booked
            const [startTime] = time.split(" - ");
            const startHour = parseInt(startTime.split(":")[0], 10);
            const isPM = startTime.includes("PM");
            const hour24 = isPM ? (startHour % 12) + 12 : startHour; // Convert to 24-hour time
            const now = new Date();
            const selectedDay = new Date(selectedDate);

            const isToday =
              now.toDateString() === selectedDay.toDateString();
            const isPast = isToday && hour24 <= now.getHours();
            const disabled = isPast || isBooked;

            return (
              <Button
                key={index}
                variant={
                  selectedTime === time
                    ? "primary"
                    : isPast
                    ? "danger"
                    : isBooked
                    ? "warning"
                    : "outline-primary"
                }
                className="mb-2 w-100"
                onClick={() => {
                  if (isBooked) {
                    alert(`The time slot ${time} is already booked. Please choose another.`);
                  } else if (isPast) {
                    alert(`The time slot ${time} is unavailable as the time has passed.`);
                  } else {
                    handleTimeClick(time);
                  }
                }}
                disabled={disabled}
              >
                {time}{" "}
                {isBooked
                  ? " (Booked)"
                  : isPast
                  ? " (Unavailable)"
                  : ""}
              </Button>
            );
          })}

          {/* All slots booked message */}
          {timeSlots.every((time) => bookedSlots.includes(time)) && (
            <p className="text-danger text-center mt-3">
              All slots are fully booked for this day. Please select another date.
            </p>
          )}
        </>
      )}
    </Col>
  </Row>
)}


         {/* Step 4: User Details Form */}
         {step === 4 && (
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>
                    Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>
                    Phone <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPeople" className="mb-3">
                  <Form.Label>
                    Number of People <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.people}
                    min="1"
                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Add a message (optional)"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}

        {/* Step 5: Booking Confirmation */}
{step === 5 && (
  <div className="confirmation-details">
    {/* Appointment Details Card */}
    <Card className="mb-4 p-3 shadow-sm">
      <div className="d-flex align-items-center">
        {/* Service Image */}
        <div className="rounded-circle border me-3" style={{ width: '80px', height: '80px', overflow: 'hidden' }}>
          <img
            src={selectedService?.image}
            alt={selectedService?.name}
            className="img-fluid"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
        {/* Details */}
        <div>
          <h5 className="fw-bold text-primary mb-2">{selectedService?.name}</h5>
          <p className="mb-1">
            <strong>Price:</strong> {selectedService?.price}
          </p>
          <p className="mb-1">
            <strong>Employee:</strong> {selectedEmployee?.name} 
          </p>
          <p className="mb-1">
            <strong>Date:</strong> {selectedDate.toDateString()}
          </p>
          <p className="mb-0">
            <strong>Time:</strong> {selectedTime}
          </p>
        </div>
      </div>
      <hr />
      <div>
        <p className="mb-1">
          <strong>Number of People:</strong> {formData.people}
        </p>
        <p className="mb-0">
          <strong>Total Price:</strong> {totalPrice} Ksh
        </p>
      </div>
    </Card>

    {/* Customer Information Card */}
    <Card className="mb-4 p-3 shadow-sm">
      <div className="d-flex align-items-center">
        {/* User Icon */}
        <div className="rounded-circle border me-3" style={{ width: '80px', height: '80px', overflow: 'hidden', backgroundColor: '#f8f9fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <i className="bi bi-person-circle fs-1 text-secondary"></i>
        </div>
        {/* Customer Details */}
        <div>
          <h5 className="fw-bold text-primary mb-2">Customer Information</h5>
          <p className="mb-1">
            <strong>Name:</strong> {formData.name}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="mb-0">
            <strong>Phone:</strong> {formData.phone}
          </p>
        </div>
      </div>
    </Card>
  </div>
)}

      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center position-relative">
  {/* Back Arrow or Placeholder */}
  {step > 1 ? (
    <div onClick={handlePrevious} className="back-arrow" style={{ cursor: "pointer" }}>
      <FaArrowLeft size={24} /> Back
    </div>
  ) : (
    <div className="back-arrow-placeholder" style={{ visibility: "hidden" }}>
      <FaArrowLeft size={24} />  
    </div>
  )}

  {/* Next Arrow */}
  {step < 5 && (
    <div onClick={handleNext} className="next-arrow" style={{ cursor: "pointer" }}>
    Next <FaArrowRight size={24} /> 
    </div>
  )}

  {/* Confirm Booking Button */}
  {step === 5 && (
    <div className="confirm-button-wrapper">
      {isLoading ? (
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Button variant="success" onClick={handleConfirm} className="confirm-button">
          Confirm Booking
        </Button>
      )}
    </div>
  )}
</Modal.Footer>


    </Modal>
  );
};

export default AppointmentModal;
