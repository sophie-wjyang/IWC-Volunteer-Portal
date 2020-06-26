import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import app, { db } from '../Firebase';
import Loading from '../Loading';

function Opportunities() {

    // const [user, setUser] = useState(null);
    // const [pending, setPending] = useState(true);
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
                    return doc.data().cohort;
                } else {
                    window.location.replace("/setup");
                }
            }).then(cohort => {
                console.log(cohort);
                let opps = [];
                const query = db.collection("opportunities");
                query.get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc.data());
                    });
                    console.log(opps);
                    setOpportunities(opps);
                })
            }).catch(error => setError(error));
            //setPending(false);
        });
    }, []);

    return (
        <>
            {complete ? <>

                <Alert variant="danger" show={error}>{error ? error.message : ""}</Alert>
            </> : <>
                <Loading />
            </>}
        </>
    )
}

export default Opportunities;