import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { firebase, db } from '../Firebase';

function SubmitModal(props) {

    const [checked, setChecked] = useState(false);
    const [submission, setSubmission] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formComplete, setFormComplete] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const form = props.opportunity.data().form;

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(null);
        setError(null);
        db.collection("submissions").add({
            userid: props.user.id,
            opportunityid: props.opportunity.id,
            submissionLink: submission,
            timeSubmitted: new Date(Date.now()),
            seenSubmission: false,
            requested: false,
            requestedHours: 0,
            seenRequested: false
        }).then(() => {
            db.collection("opportunities").doc(`${props.opportunity.id}`).update({
                reviews: firebase.firestore.FieldValue.arrayUnion(feedback)
            })
        }).then(() => {
            db.collection("users").doc(`${props.user.id}`).update({
                completed: firebase.firestore.FieldValue.arrayUnion(`${props.opportunity.id}`)
            })
        }).then(() => setSuccess("The opportunity was successfully submitted.")).catch(error => setError(error));
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="modal-new-opportunities"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Submit Opportunity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={event => {
                    setSubmitted(true);
                    handleSubmit(event);
                }}>
                    {(!form || form === "") ? <>
                        <Form.Group>
                            <Form.Text>Please submit a link to your work for the opportunity (e.g. Google Drive).</Form.Text>
                            <Form.Control required={!checked} disabled={checked} type="url" value={submission} onChange={event => setSubmission(event.target.value)} placeholder="Submission Link"></Form.Control>
                        </Form.Group>
                        <Form.Check type="checkbox" label="I've submitted my opportunity through another means" checked={checked} onChange={() => setChecked(!checked)} />
                    </> : <>
                            <p>Please complete this form for your submission: <a href={form} target="_blank" rel="noopener noreferrer" onClick={() => { setFormComplete(true) }}>{form}</a></p>
                        </>}
                    <Form.Group>
                        <Form.Text>Please give us some short feedback (only 2 to 3 sentences) on your experience completing this opportunity. This is anonymous so feel free to be completely honest with us.</Form.Text>
                        <Form.Control required as="textarea" rows="3" value={feedback} maxLength={300} onChange={event => setFeedback(event.target.value)} placeholder="Feedback"></Form.Control>
                    </Form.Group>

                    {(!form || form === "") ? <Button style={{ backgroundColor: "#FC4445", border: "#FC4445", margin: "10px" }} type="submit" disabled={feedback === "" || (submission === "" && !checked) || success || submitted}>
                        Submit
                    </Button> : <Button style={{ backgroundColor: "#FC4445", border: "#FC4445", margin: "10px" }} type="submit" disabled={feedback === "" || !formComplete || success || submitted}>
                            Submit
                    </Button>}
                </Form>
            </Modal.Body>
            <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
            <Alert variant="success" show={success}>{success}</Alert>
        </Modal>
    )
}

export default SubmitModal;