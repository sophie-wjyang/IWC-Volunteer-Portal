import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { auth } from './Firebase';

function DeleteModal(props) {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submit = () => {
        setError(null);
        setSuccess(null);
        auth.currentUser.delete().then(() => {
            setSuccess("User has successfully been deleted")
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
                <Modal.Title>Are you sure you want to delete your account?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer>
                <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
                <Alert variant="success" show={success}>{success}</Alert>
                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={submit}>Yes, delete.</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal;