import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { Alert } from 'react-bootstrap';
import app, { db } from '../Firebase';

import Track from './Track';

function Tracker() {

    //const [user, setUser] = useState(null);
    // const [pending, setPending] = useState(true);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState(false);
    const [submissions, setSubmissions] = useState(null);
    const [empty, setEmpty] = useState(true);

    //const [userData, setUserData] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            //setUser(user);
            db.collection("users").doc(`${user.uid}`).get().then(doc => {
                if (doc.data().quizCompleted) {
                    //setUserData(doc.data());
                    setComplete(true);
                    return doc.data();
                } else {
                    window.location.replace("/setup");
                }
            }).then(data => {
                if (data.completed.length > 0) {
                    setEmpty(false);
                    db.collection("submissions").where("opportunityid", "in", data.completed).where("userid", "==", user.uid).orderBy("timeSubmitted").get().then(querySnapshot => {
                        let subs = [];
                        querySnapshot.forEach(sub => {
                            subs.push(sub);
                        })
                        setSubmissions(subs);
                    }).catch(error => setError(error));
                }
            }).catch(error => setError(error));
            //setPending(false);
        });
    }, []);

    return (<>
        {complete ? <>
            <div className="admin-container">
            
                <div className="admin-opportunities">
                <h1 style={{ alignSelf: "flex-start", margin: "20px 0 20px 0" }}>Opportunity Tracker</h1>
                <p style={{ alignSelf: "flex-start", margin: "20px 0 20px 0" }}>The opportunities that you've submitted for will show up on this page. You may indicate the number of hours that you have spent on a submission and send a request to the IWC team, the request will then be reviewed by an IWC admin. Once the request is approved, please send us an email at impactwithoutcontact@gmail.com with a screenshot of the "Tracker" page.</p>
                    
                    {empty ? <div><p>You have not submitted for any opportunities yet.</p></div> : <div style={{ width: "100%"}}>{submissions && submissions.map(submission => <Track submission={submission} />)}</div>}
                    
                    <Alert variant="danger" show={error} style={{ width: "90%" }}>{error ? `${error.message} ` : ""}</Alert>

                </div>
            </div>
        </> : <>
                <Loading />
            </>}
    </>);
}

export default Tracker;
