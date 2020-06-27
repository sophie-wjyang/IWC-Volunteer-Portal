import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import app, { db } from '../Firebase';
import Loading from '../Loading';
import Opportunity from './Opportunity';

import './index.css';

function Opportunities() {

    // const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState(false);
    const [opportunities, setOpportunities] = useState(null);

    // const [userData, setUserData] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            // setUser(user);
            db.collection("users").doc(`${user.uid}`).get().then(doc => {
                if (doc.data().quizCompleted) {
                    // setUserData(doc.data());
                    setComplete(true);
                } else {
                    window.location.replace("/setup");
                }
            }).then(() => {
                let opps = [];
                db.collection("opportunities").orderBy('updated', 'desc').get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => setError(error));
            }).catch(error => setError(error));
        });
    }, []);

    return (
        <>
            {complete && !pending ? <>
                <div className="opportunities-container">
                    {(opportunities) ? (<div className="opportunities-opportunities">
                        <h3>Opportunities List</h3>
                        <div className="opportunities-card-container">{opportunities.map(opportunity => <Opportunity
                            opportunity={opportunity.data()}
                        />)}</div>
                    </div>) : (<div className="opportunities-opportunities">
                        <h3>List</h3>
                        <br />
                        <p>There are currently no opportunities available.</p>
                    </div>)}
                    <Alert variant="danger" show={error}>{error ? error.message : ""}</Alert>
                </div>
                
            </> : <>
                    <Loading />
                </>}
        </>
    )
}

export default Opportunities;