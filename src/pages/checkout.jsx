import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button, Form, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const { appointments, totalDeposit } = location.state || {};
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("danger");

  const handlePlaceOrder = async () => {
    if (!phoneNumber.match(/^2547\d{8}$/)) {
      setResponseMessage("Enter a valid phone number: 2547XXXXXXXX");
      setResponseType("danger");
      return;
    }

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/checkout`,
        {
          phoneNumber,
          amount: totalDeposit,
          appointments,
        }
      );

      setResponseMessage(response.data.message);
      setResponseType("success");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage(error.response?.data?.error || "Payment initiation failed.");
      setResponseType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Checkout</h1>

          <Card className="shadow-lg rounded-3 mb-4">
            <Card.Body>
              <h5>Total Deposit: KES {totalDeposit?.toLocaleString()}</h5>
              <Form>
                <Form.Group controlId="mpesaPhone" className="mb-3">
                  <Form.Label>Enter M-Pesa Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  size="lg"
                  block
                  className="w-100 shadow-sm"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </Form>
              {responseMessage && (
                <Alert variant={responseType} className="mt-3">
                  {responseMessage}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
