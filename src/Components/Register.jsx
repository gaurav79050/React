import React, { useState, useRef } from "react";
import Section from "./Layouts/Section";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { validateForm } from "./Validation";
import { toast } from "react-toastify";
import { registerUser } from "./Api";
const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  const handleForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setUserData({ ...userData, ["image"]: e.target.files[0].name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(userData)) {
      return;
    }
    try {
      const response = await registerUser(userData);

      if (response == 201) {
        toast.success("Registered successfully");
        setUserData({
          username: "",
          email: "",
          contact: "",
          password: "",
          image: "",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        toast.error("An error occurred during registration");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <Section>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h3>Register</h3>
            <Form id="form" onSubmit={handleSubmit} method="post">
              <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.username}
                  name="username"
                  onChange={handleForm}
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={userData.email}
                  name="email"
                  onChange={handleForm}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  value={userData.contact}
                  name="contact"
                  onChange={handleForm}
                  placeholder="Enter your contact number"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={userData.password}
                  name="password"
                  onChange={handleForm}
                  placeholder="Password"
                  minLength="8"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>profile image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => handleImage(e)}
                  ref={fileInputRef}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Register;
