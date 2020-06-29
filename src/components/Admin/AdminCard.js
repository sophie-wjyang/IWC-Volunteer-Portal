import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import EditModal from './EditModal';
import ReadModal from './ReadModal';

function AdminCard(props) {
    const opportunity = props.opportunity;
    const [showModal, setShowModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric', second: 'numeric' };

    return (
        <Card className="opportunity-card">
            <Card.Body>
                <Card.Title><h4>{opportunity.data().name}</h4></Card.Title>

                <h5>{opportunity.data().organization} {opportunity.data().partnership ? (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">IWC Partnership</Badge>) : (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Opportunity</Badge>)} {opportunity.data().available ? (<></>) : (<Badge variant="secondary">Deleted</Badge>)}</h5>
                <h6>{opportunity.data().cohort}</h6>
                <Card.Text>
                    <small>Posted on {opportunity.data().added.toDate().toLocaleDateString(undefined, options)}</small>
                    <br />
                    <small>Last updated on {opportunity.data().updated.toDate().toLocaleDateString(undefined, options)}</small>
                </Card.Text>
                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445", marginRight: "20px" }} onClick={() => {setShowModal(true)}}>Edit</Button>
                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => {setViewModal(true)}}>View</Button>
            </Card.Body>
            <EditModal show={showModal} onHide={() => {setShowModal(false); window.location.reload()}} opportunity={opportunity.data()} id={opportunity.id} />
            <ReadModal show={viewModal} onHide={() => {setViewModal(false)}} opportunity={opportunity.data()} id={opportunity.id} />
        </Card>
    )
}

export default AdminCard;