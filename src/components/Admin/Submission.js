import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from 'react-bootstrap'
import { db } from '../Firebase';

function Submission(props) {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const submission = props.submission.data();
    const submissionTime = props.submission.data().timeSubmitted.toDate().toLocaleDateString(undefined, options);
    const processed = props.submission.data().seenSubmission;
    const submissionLink = props.submission.data().submissionLink;
    const [userName, setUserName] = useState(null);
    const [opportunityName, setOpportunityName] = useState(null);
    const [opportunityOrganization, setOpportunityOrganization] = useState(null);
    const [partnership, setPartnership] = useState(false);

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
                <p>{opportunityName}</p>
                <p>{opportunityOrganization} {partnership ? (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">IWC Partnership</Badge>) : (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Opportunity</Badge>)}</p>
            </div>
            <div style={{ width: "40%", margin: "auto" }}>
                <p>Link to submission: <a href={submissionLink}>{submissionLink}</a></p>
                <p>{submissionTime}</p>
            </div>
            <div style={{ width: "15%", margin: "auto" }}>
                <Button disabled={processed} onClick={() => {
                    db.collection("submissions").doc(`${props.submission.id}`).update({
                        seenSubmission: true
                    }).then(() => window.location.reload()).catch(error => console.log(error));
                }}>{processed ? "Processed" : "Complete"}</Button>
            </div>
        </Card>
    )
}

export default Submission;