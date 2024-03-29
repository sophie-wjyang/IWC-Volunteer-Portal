import React, { useState, useContext, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { UserContext } from './Providers/UserProvider';
import app, { login, auth, db } from './Firebase';
import EmailModal from './EmailModal';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sentVerification, setSentVerification] = useState(false);
    const [error, setError] = useState(null);

    const [emailModal, setEmailModal] = useState(false);

    let user = useContext(UserContext);

    useEffect(() => {
        if(user && user.emailVerified) {
            window.location.replace("/dashboard");
        }
    }, [user])

    const emailChange = (event) => {
        setEmail(event.target.value);
    }

    const passwordChange = (event) => {
        setPassword(event.target.value);
    }

    const resendVerification = (event) => {
        event.preventDefault();
        setError(null);
        setSentVerification(false);
        login(email, password).then(user => {
            setSentVerification(true);
            return app.auth().currentUser.sendEmailVerification()
        }).then(() => {
            app.auth().signOut();
        }).catch(error => {
            setError(error);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSentVerification(false);
        setError(null);
        login(email, password).then(user => {
            setError(null);
            console.log(user)
            if (!user.user.emailVerified) {
                let temp = {
                    message: 'Email has not been verified.'
                }
                setError(temp);
                auth.signOut();
            }
            return user;
        }).then(user => {
            if (user.user.emailVerified) {
                db.collection("users").doc(`${user.user.uid}`).update({
                    lastLoggedIn: new Date(Date.now())
                }).then(() => window.location.replace("/dashboard")).catch(error => setError(error));
            }
        }).catch(error => {
            if (error.message !== 'Email has not been verified.') {
                setError(error);
            }
        });
    }

    return (
        <div style={{ width: "100%", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Card className="credentials-card">
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
                            <Form.Text><strong onClick={() => setEmailModal(true)}>Forgot your password?</strong></Form.Text>
                            <EmailModal show={emailModal} onHide={() => setEmailModal(false)} />
                        </Form.Group>
                        <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} type="submit" disabled={email === '' || password.length < 6}>
                            Submit
                        </Button>
                    </Form>
                    <br />
                    <Card.Text>
                        <small className="text-muted">Don't have an account? Sign up <a href="/signup" style={{ color: "#FC4445" }}>here</a>.</small>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Alert variant="danger" show={error}>{error ? `${error.message} ` : ""}
            {(error && error.message === 'Email has not been verified.') ? (<>Click <strong onClick={resendVerification}>here</strong> to resend your verification email.</>) : (<></>)}</Alert>
            <Alert variant="success" show={sentVerification}>A verification email has been sent to your inbox.</Alert>
        </div>
    );
}

export default Login;