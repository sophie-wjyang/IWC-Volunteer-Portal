import React, { useState } from 'react';
import { Badge, Card, Button, Alert } from 'react-bootstrap';
import ViewUserModal from './ViewUserModal';
import { db } from '../Firebase';

function UserCard(props) {
    const user = props.user;
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    //const [success, setSuccess] = useState(null);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <Card className="opportunity-card">
            <Card.Body>
                <Card.Title><h4>{user.data().quizCompleted ? user.data().name : "User not setup"}</h4></Card.Title>
                <p>{user.data().email}</p>
                {user.data().admin ? <Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Admin</Badge> : <></>}
                <h6>{user.data().cohort}</h6>
                <small>User created on {user.data().dateCreated.toDate().toLocaleDateString(undefined, options)}</small>
                <br />
                {user.data().lastLoggedIn ? <small>User last logged in on {user.data().lastLoggedIn.toDate().toLocaleDateString(undefined, options)}</small> : <></>}
                <br />
                {user.data().admin ? <><Button style={{ backgroundColor: "#FC4445", border: "#FC4445", marginRight: "20px" }} onClick={() => {
                    db.collection("users").doc(`${user.id}`).update({
                        admin: false,
                    }).then(() => window.location.reload()).catch(error => setError(error));
                }}>Remove Admin</Button></> : <><Button style={{ backgroundColor: "#FC4445", border: "#FC4445", marginRight: "20px" }} onClick={() => {
                    db.collection("users").doc(`${user.id}`).update({
                        admin: true,
                    }).then(() => window.location.reload()).catch(error => setError(error));
                }}>Make Admin</Button></>}
                {user.data().quizCompleted ? <Button style={{ backgroundColor: "#FC4445", border: "#FC4445", marginRight: "20px" }} onClick={() => { setShowModal(true) }}>View</Button> : <></>}
            </Card.Body>
            <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
            <ViewUserModal show={showModal} onHide={() => { setShowModal(false) }} user={user.data()} id={user.id} />
        </Card>
    )
}

export default UserCard;