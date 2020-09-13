import React, { useState, useContext } from 'react';
import { Form, Button, Card, Container, Row, Col, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './Authentication.scss';
import { Link } from 'react-router-dom';
import createBEM from '../../utils/createBEM';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Toast from '../Toast/Toast';
import { getToken, removeToken } from '../../utils/tokenManager';
import { logout } from '../../data/avatar.json';

const Authentication = () => {
  const { register, handleSubmit } = useForm();
  const { logIn, signUp, error, setError } = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(!!getToken());
  const BEM = createBEM('Authentication');
  const [login, setLogin] = useState(true);

  const auth = (values) => {
    if (login) return logIn(values);
    return signUp(values);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className={BEM()}>
            {isAuth ? (
              <Card.Body>
                <Image roundedCircle className={BEM('avatar')} src={logout} />
                <Card.Title>Would you like to log out?</Card.Title>
                <Button
                  onClick={() => {
                    removeToken();
                    setIsAuth(false);
                  }}
                  variant="warning"
                >
                  Logout
                </Button>
              </Card.Body>
            ) : (
              <Form onSubmit={handleSubmit(auth)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    ref={register}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We ll never share your email with anyone.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ref={register}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Container className={BEM('controls')}>
                  <Button variant="primary" type="submit">
                    {login ? 'Login' : 'Submit'}
                  </Button>
                  <Link to="/auth" onClick={() => setLogin(!login)}>
                    {login ? 'Would you like to sign up?' : 'Would you like to log in?'}
                  </Link>
                </Container>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {error && <Toast error={error} resetError={setError} />}
        </Col>
      </Row>
    </Container>
  );
};
export default Authentication;
