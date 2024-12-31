// src/components/CourseCheckout.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";

const CourseCheckout = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/courses/checkout`, {
        phoneNumber,
        amount: 15000, // Deposit amount
      });

      setMessage({ type: "success", content: response.data.message });
    } catch (error) {
      setMessage({
        type: "danger",
        content: error.response?.data?.error || "Failed to initiate payment. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Course Checkout</h2>
          <p>Pay a deposit of <strong>KES 15,000</strong> to book your course.</p>
          <p className="text-danger">*The deposit is non-refundable and non-transfarable.*</p>
          {message.content && <Alert variant={message.type}>{message.content}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="mt-3"
            >
              {isLoading ? "Processing..." : "Pay Deposit"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseCheckout;
