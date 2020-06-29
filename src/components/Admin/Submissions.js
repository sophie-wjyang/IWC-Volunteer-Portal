import React, { useState, useEffect } from 'react';
import { Badge, Alert } from 'react-bootstrap';
import { db } from '../Firebase';
import Submission from './Submission';

function Submissions() {

    const [newSubmissions, setNewSubmissions] = useState(null);
    const [oldSubmissions, setOldSubmissions] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        db.collection("submissions").get().then(querySnapshot => {
            let oldSubs = [];
            let newSubs = [];
            querySnapshot.forEach(sub => {
                if (sub.data().seenSubmission === false) {
                    oldSubs.push(sub);
                } else {
                    newSubs.push(sub);
                }
            })
            setOldSubmissions(oldSubs);
            setNewSubmissions(newSubs);
        }).catch(error => setError(error));
    }, [])

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h2><Badge style={{ backgroundColor: "#FC4445" }} variant="info">New</Badge></h2>
            {oldSubmissions && oldSubmissions.map(oldSubmission => <Submission submission={oldSubmission} />)}
            <br></br>
            <h2><Badge variant="secondary">Processed</Badge></h2>
            {newSubmissions && newSubmissions.map(newSubmission => <Submission submission={newSubmission} />)}
            <Alert variant="danger" show={error} style={{ width: "90%" }}>{error ? `${error.message} ` : ""}</Alert>
        </div>
    )
}

export default Submissions;