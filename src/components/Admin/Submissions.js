import React, { useState, useEffect } from 'react';
import { Badge, Alert, Button } from 'react-bootstrap';
import { db } from '../Firebase';
import Submission from './Submission';

function Submissions() {

    const [newSubmissions, setNewSubmissions] = useState(null);
    const [oldSubmissions, setOldSubmissions] = useState(null);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        db.collection("submissions").where("seenSubmission", "==", false).orderBy("timeSubmitted", "desc").get().then(querySnapshot => {
            let newSubs = [];
            querySnapshot.forEach(sub => {
                newSubs.push(sub);
            })
            setNewSubmissions(newSubs);
        }).catch(error => setError(error));
        if (show) {
            db.collection("submissions").where("seenSubmission", "==", true).orderBy("timeSubmitted", "desc").get().then(querySnapshot => {
                let oldSubs = [];
                querySnapshot.forEach(sub => {
                    oldSubs.push(sub);
                })
                setOldSubmissions(oldSubs);
            }).catch(error => setError(error));
        } else {
            db.collection("submissions").where("seenSubmission", "==", true).orderBy("timeSubmitted", "desc").limit(5).get().then(querySnapshot => {
                let oldSubs = [];
                querySnapshot.forEach(sub => {
                    oldSubs.push(sub);
                })
                setOldSubmissions(oldSubs);
            }).catch(error => setError(error));
        }

    }, [show])

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h2><Badge style={{ backgroundColor: "#FC4445" }} variant="info">New</Badge></h2>
            {newSubmissions && newSubmissions.map(newSubmission => <Submission submission={newSubmission} />)}
            <br></br>
            <h2><Badge variant="secondary">Processed</Badge></h2>
            {oldSubmissions && oldSubmissions.map(oldSubmission => <Submission submission={oldSubmission} />)}
            <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => setShow(true)}>Show All</Button>
            <Alert variant="danger" show={error} style={{ width: "90%" }}>{error ? `${error.message} ` : ""}</Alert>
        </div>
    )
}

export default Submissions;