import React, { useState, useEffect } from 'react';
import { db } from '../Firebase';
import ReadModal from './ReadModal';
import { Form, Button, Alert } from 'react-bootstrap';

function Track(props) {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const requested = props.submission.data().requested;
    const requestedHours = props.submission.data().requestedHours;
    const timeSubmitted = props.submission.data().timeSubmitted.toDate().toLocaleDateString(undefined, options)
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [opportunity, setOpportunity] = useState(null);

    const [hours, setHours] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        db.collection("opportunities").doc(`${props.submission.data().opportunityid}`).get().then(doc => {
            setOpportunity(doc);
            setName(doc.data().name);
            setOrganization(doc.data().organization);
        })
    }, [props])

    const sendRequest = () => {
        db.collection("submissions").doc(`${props.submission.id}`).update({
            requested: true,
            requestedHours: hours
        }).then(() => window.location.reload()).catch(error => setError(error));
    }

    return (<div style={{ width: '100%', margin: "20px", alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: "56%", margin: "auto" }}>
            <h5>{name}</h5>
            <h6>{organization}</h6>
            <p>Submitted on {timeSubmitted}</p>
        </div>


        <p style={{ color: "#FC4445", margin: "auto", width: "4%" }} onClick={() => setShowModal(true)}>View</p>
        <div style={{ width: "35%", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", margin: "auto" }}>
            <Form style={{ width: "60%" }}><Form.Text>Indicate the number of hours you've spent</Form.Text><Form.Control disabled={requested} type="number" placeholder={requested ? `${requestedHours}` : "Hours"} min="0" max="100" value={hours} onChange={event => setHours(event.target.value)}></Form.Control></Form>

            <Button disabled={!hours || requested} style={{ backgroundColor: "#FC4445", border: "#FC4445", width: "30%" }} onClick={sendRequest}>{requested ? "Requested" : "Request Hours"}</Button>
        </div>


        {opportunity && <ReadModal show={showModal} onHide={() => setShowModal(false)} opportunity={opportunity} />}
        <Alert variant="danger" show={error}>{error ? error.message : ""}</Alert>
    </div>)
}

export default Track;