import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="mb-4">Admin Panel</h1>
          <p>Welcome to the Admin Panel. Please choose an option below to proceed.</p>
          <div className="d-flex justify-content-around mt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/admin/login')}
            >
              Login
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate('/admin/register')}
            >
              Register
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
