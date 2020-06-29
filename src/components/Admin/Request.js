import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap'
import { db } from '../Firebase';

function Request(props) {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const submission = props.submission.data();
    const submissionTime = props.submission.data().timeSubmitted.toDate().toLocaleDateString(undefined, options);
    const processed = props.submission.data().seenRequested;
    const submissionLink = props.submission.data().submissionLink;
    const [userName, setUserName] = useState(null);
    const [opportunityName, setOpportunityName] = useState(null);
    const [opportunityOrganization, setOpportunityOrganization] = useState(null);
    const [partnership, setPartnership] = useState(false);
    const requestedHours = props.submission.data().requestedHours;

    useEffect(() => {
        db.collection("users").doc(`${submission.userid}`).get().then(doc => {
            setUserName(doc.data().name);
        })

        db.collection("opportunities").doc(`${submission.opportunityid}`).get().then(doc => {
            setOpportunityName(doc.data().name);
            setOpportunityOrganization(doc.data().organization);
            setPartnership(doc.data().partnership);
        })
    }, [submission])


    return (
        <Card style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "10px", margin: "5px" }}>
            <div style={{ width: "50%", margin: "auto" }}>
                <h6>{userName}</h6>
                <p>{opportunityName} {partnership ? (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">IWC Partnership</Badge>) : (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Opportunity</Badge>)}</p>
                <p>{opportunityOrganization}</p>
            </div>
            <div style={{ width: "40%", margin: "auto" }}>
                <h6>Hours requested: {requestedHours}</h6>
                <p>Link to submission: <a href={submissionLink}>{submissionLink}</a></p>
                <p>{submissionTime}</p>
            </div>
            <div style={{ width: "15%", margin: "auto" }}>
                <Button disabled={processed} onClick={() => {
                    db.collection("submissions").doc(`${props.submission.id}`).update({
                        seenRequested: true
                    }).then(() => window.location.reload()).catch(error => console.log(error));
                }}>{processed ? "Processed" : "Complete"}</Button>
            </div>
        </Card>
    )
}

export default Request;