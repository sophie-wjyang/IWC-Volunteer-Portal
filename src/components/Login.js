import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

import { db, login, auth } from './Firebase';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password).then(user => {
            setError(null);
            if (!user.user.emailVerified) {
                let temp = {
                    message: 'Email has not been verified.'
                }
                setError(temp);
                Promise.reject();
            }
            return user;
        }).then(user => {
            db.collection("users").doc(`${user.user.uid}`).get().then(doc => {
                if (doc.data().quizCompleted) {
                    console.log("here");
                    window.location.replace("/dashboard");
                } else {
                    console.log("there");
                    window.location.replace("/setup");
                }
            })
        }).catch(error => {
            if (error.message !== 'Email has not been verified.') {
                setError(error);
            }
        });
    }

    console.log(auth.currentUser + "hi");

    return(
        <div style={{ width: "100%", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Card>
                <Card.Body>
                    <Card.Title>Log In</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" value={email} onChange={emailChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" value={password} onChange={passwordChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <br />
                    <Card.Text>
                        <small className="text-muted">Don't have an account? Sign up <a href="/signup">here</a>.</small>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Alert variant="danger" show={error}>{error ? error.message : ""}</Alert>
        </div>
    );
}

export default Login;