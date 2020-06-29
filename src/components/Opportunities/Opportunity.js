import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import ReadModal from './ReadModal';

function Opportunity(props) {
    const opportunity = props.opportunity;
    const [showModal, setShowModal] = useState(false);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <Card className="opportunities-opportunity-card">
            <Card.Body>
                <Card.Title><h4>{opportunity.data().name}</h4></Card.Title>
                <h5 style={{ marginTop: "16px" }}>{opportunity.data().organization} {opportunity.data().partnership ? (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">IWC Partnership</Badge>) : (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Opportunity</Badge>)} {props.submitted ? (<Badge variant="secondary">Submitted</Badge>) : (<></>)}</h5>
                <h6 style={{ marginTop: "16px" }}>Cohort: {opportunity.data().cohort}</h6>
                <h6 style={{ marginTop: "16px" }}>Skills: </h6>
                <ul>
                    {opportunity.data().skills.map(skill => <li>{skill} </li>)}
                </ul>
            </Card.Body>
            <Card.Footer>
                <Card.Text>
                    <small>Last updated on {opportunity.data().updated.toDate().toLocaleDateString(undefined, options)}</small>
                </Card.Text>
                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => { setShowModal(true) }}>More Info</Button>
            </Card.Footer>
            <ReadModal show={showModal} onHide={() => { setShowModal(false) }} opportunity={opportunity} user={props.user} submitted={props.submitted} />
        </Card >
    )
}

export default Opportunity;