import React, { useState, useEffect } from 'react';
import app, { db } from '../Firebase';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { Button, Form } from 'react-bootstrap';
import NewModal from './NewModal';
import './styles.css';

function Admin() {

    // const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [admin, setAdmin] = useState(null);

    const [formfield, setFormfield] = useState("");
    const [doc, setDoc] = useState(null);

    const [newOpportunity, setNewOpportunity] = useState(false);

    const test = () => {
        db.collection("test").doc("test").set({
            test: `${formfield}`
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            // setUser(user);
            if (user) {
                db.collection("users").doc(`${user.uid}`).get().then(doc => {
                    setAdmin(doc.data().admin);
                })
            }
            /*db.collection("opportunities").get().then(doc => {
                setDoc(doc.data());
            })*/
            setPending(false);
        })
    }, []);

    if (pending || admin == null) {
        return <Loading />
    }

    return (
        <>
            {(admin !== null && admin) ? (<>
                <div className="admin-container">
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: "30px"}}>
                        <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => setNewOpportunity(true)}>Add Opportunity</Button>
                        <NewModal show={newOpportunity} onHide={() => setNewOpportunity(false)} />
                    </div>
                </div>

            </>) : (<>
                <Redirect to="/dashboard" />
            </>)}
        </>
    )
};

export default Admin;