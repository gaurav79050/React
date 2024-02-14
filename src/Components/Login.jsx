import React from "react";
import Section from "./Layouts/Section";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Login.css";
import { loginApi } from "./Api";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/index";
import { validateForm } from "./Validation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    let userData = {
      email,
      password,
    };
    if (!validateForm(userData)) {
      return;
    }

    let response = await loginApi(email, password);
    console.log(response);
    if (response.status === 200 && response.dataLength == 1) {
      dispatch(authActions.login(response.userDetails));
    } else {
      toast.error("Invalid Credientials");
    }
  };

  return (
    <Section>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h3>Login</h3>
            <Form id="form">
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Login;
