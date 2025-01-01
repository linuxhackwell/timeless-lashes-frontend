import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import './Footer.css'
import logo from "../assets/Timelesslashes.jpg"; // Import image directly


const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5  mt-5">
      <Container>
        <Row>
          {/* Branding Section */}
          <Col lg={3} md={6} className="mb-4 mx-4">
            <h4 className="text-uppercase text-gold">Timeless Lashes</h4>
            <p className="">
              Fabulous lashes, fabulous you. Let your beauty shine with perfection!
            </p>
            <img
              src= {logo}
              alt="Timeless Lashes Logo"
              className="img-fluid"
              style={{
                height: '120px',
                width: '120px',
                borderRadius: '50%',
                marginRight: '10px',
              }}
            />
          </Col>

          

          {/* Contact Information Section */}
<Col lg={3} md={6} className="mb-4 mx-5">
  <h5 className="text-gold">Contact Us</h5>
  <p>
    <span className="me-2 text-gold">
      <FaMapMarkerAlt />
    </span>
    Please call to confirm location.
  </p>
  <p>
    <span className="me-2 text-gold">
      <FaPhoneAlt />
    </span>
    <a href="tel:+254718648052">+254718648052</a>
  </p>
  <p>
    <span className="me-2 text-gold">
      <FaEnvelope />
    </span>
    <a href="mailto:timelesslashes7@gmail.com">timelesslashes7@gmail.com</a>
  </p>
</Col>


{/* Admin Access Section */}
<Col lg={3} md={6} className="mb-4">
    <h5 className="text-gold">Admin Access</h5>
    <div className="d-flex flex-column">
      <a href="/admin/login" className="mb-2">Admin Login</a>
      <a href="/admin/register" className="">Admin Register</a>
    </div>
  </Col>


          {/* Social Media and Newsletter */}
          <Col lg={3} md={6} className="mb-4">
            <h5 className="text-gold">Stay Connected</h5>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="fs-4"><FaFacebookF /></a>
              <a href="#" className="fs-4"><FaInstagram /></a>
              <a href="#" className="fs-4"><FaTwitter /></a>
              <a href="#" className="fs-4"><FaTiktok /></a>
            </div>
            <h6>Newsletter</h6>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="me-2"
              />
              <Button className="btn-gold">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <hr className="my-4 text-muted" />

        {/* Bottom Footer Section */}
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; 2024 Timeless Lashes. All Rights Reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex gap-3 justify-content-center justify-content-md-end">
              <a href="/privacy-policy" className="text-muted">Privacy Policy</a>
              <a href="/terms" className="text-muted">Terms of Service</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
