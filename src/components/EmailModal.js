import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { passwordReset } from './Firebase';

function EmailModal(props) {


    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submit = () => {
        passwordReset(email).then(() => {
            setSuccess("A password reset email has been sent to your inbox.");
        }).catch(error => setError(error));
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="modal-new-opportunities"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Reset Your Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Email Associated With Your Account</Form.Label>
                        <Form.Control required type="email" placeholder="Your Email" value={email} onChange={event => setEmail(event.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
                <Alert variant="success" show={success}>{success}</Alert>
                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} disabled={success} onClick={submit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EmailModal;