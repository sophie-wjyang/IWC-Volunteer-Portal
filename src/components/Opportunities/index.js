import React, { useState, useEffect } from 'react';
import { Alert, /*Form*/ } from 'react-bootstrap';
import app, { db } from '../Firebase';
import Loading from '../Loading';
import Opportunity from './Opportunity';

import './index.css';

function Opportunities() {

    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState(false);
    const [opportunities, setOpportunities] = useState(null);

    //const [sort, setSort] = useState(['updated', 'desc'])

    const sort = ['updated', 'desc'];

    // const [userData, setUserData] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            // setUser(user);
            db.collection("users").doc(`${user.uid}`).get().then(doc => {
                if (doc.data().quizCompleted) {
                    setUser(doc);
                    setComplete(true);
                } else {
                    window.location.replace("/setup");
                }
            }).catch(error => setError(error));
        });
    }, []);

    useEffect(() => {
        let opps = [];
        db.collection("opportunities").where("available", "==", true).orderBy(sort[0], sort[1]).get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                opps.push(doc);
            });
            setOpportunities(opps);
            setPending(false);
        }).catch(error => {setError(error); setPending(false)});
    }, [sort]);

    return (
        <>
            {complete && !pending ? <>
                <div className="opportunities-container">
                    {(opportunities) ? (<div className="opportunities-opportunities">
                        <h3>Opportunities List</h3>
                        <br />
                        {/*<div>
                            <h5>Sort: </h5>
                            <Form inline></Form>
                        </div>*/}
                        <div className="opportunities-card-container">{opportunities.map(opportunity => {
                        const submitted=(user.data().completed.includes(opportunity.id));
                        return <Opportunity
                            opportunity={opportunity} user={user} submitted={submitted}
                        />})}</div>
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