import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { passwordUpdate } from '../Firebase';

function PasswordModal(props) {


    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submit = () => {
        passwordUpdate(password1).then(() => {
            setSuccess("Your password has been changed successfully.");
        }).catch(error => setError(error));
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="modal-new-opportunities"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Change Your Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" value={password1} onChange={event => setPassword1(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" placeholder="Password" value={password2} onChange={event => setPassword2(event.target.value)} />
                    </Form.Group>
                </Form>



            </Modal.Body>
            <Modal.Footer>
                <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
                <Alert variant="success" show={success}>{success}</Alert>
                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} disabled={password1 !== password2} onClick={submit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PasswordModal;