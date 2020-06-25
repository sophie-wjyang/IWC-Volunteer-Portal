import React, { useState, useContext, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { UserContext } from './Providers/UserProvider';
import app from './Firebase';

function Signup() {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [sentVerification, setSentVerification] = useState(false);
    const [error, setError] = useState(null);

    let user = useContext(UserContext);

    useEffect(() => {
        if(user && user.emailVerified) {
            window.location.replace("/dashboard");
        }
    }, [user])

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const password1Change = (event) => {
        setPassword1(event.target.value);
    }

    const password2Change = (event) => {
        setPassword2(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSentVerification(false);
        setError(null);
        app.auth().createUserWithEmailAndPassword(email, password1).then(user => {
            return app.firestore().collection("users").doc(`${user.user.uid}`).set({
                quizCompleted: false
            })
        }).then(() => {
            setSentVerification(true); 
            return app.auth().currentUser.sendEmailVerification()
        }).then(() => {
            app.auth().signOut();
        }).catch(error => {
            setError(error);
        });
    }

    return(
        <div style={{ width: "100%", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Card>
                <Card.Body>
                    <Card.Title>Sign Up</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" value={email} onChange={emailChange} />
                        </Form.Group>
                        <Form.Group controlId="formPassword1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" value={password1} onChange={password1Change} />
                        </Form.Group>
                        <Form.Group controlId="formPassword2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" value={password2} onChange={password2Change} />
                        </Form.Group>
                        {/*incorrect ? (<><Form.Text style={{ color: "#DC3545"}}>An error has occurred!</Form.Text><br /></>) : (<></>) */}
                        <Button disabled={password1 !== password2 || password1 === '' || email === '' || password1.length < 6} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <br />
                    <Card.Text>
                        <small className="text-muted">Already have an account? Log in <a href="/login">here</a>.</small>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Alert variant="success" show={sentVerification}>A verification email has been sent to your inbox.</Alert>
            <Alert variant="danger" show={error}>{error ? error.message : ""}</Alert>
        </div>
    );
}

export default Signup;