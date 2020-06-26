import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button } from 'react-bootstrap';
import app, { db } from '../Firebase'
import Loading from '../Loading';
import './index.css';
import Opportunity from './Opportunity';

function Dashboard() {

    const [user, setUser] = useState(null);
    // const [pending, setPending] = useState(true);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState(false);
    const [opportunities, setOpportunities] = useState(null);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            setUser(user);
            db.collection("users").doc(`${user.uid}`).get().then(doc => {
                if (doc.data().quizCompleted) {
                    setUserData(doc.data());
                    setComplete(true);
                    return doc.data().cohort;
                } else {
                    window.location.replace("/setup");
                }
            }).then(cohort => {
                console.log(cohort);
                let opps = [];
                const query = db.collection("opportunities").where("cohort", "==", `${cohort}`).limit(3);
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

    /*if (pending) {
        return <Loading />;
    } else {
        db.collection("users").doc(`${user.uid}`).get().then(doc => {
            if (!doc.data().quizCompleted) {
                window.location.replace("/setup");
            }
        })
    }*/

    return (
        <>
            {complete ? <>
                <div style={{ display: "flex", width: "100vw", flexDirection: "column", alignItems: "center" }}>
                    <div className="dashboard-container">
                        <div className="dashboard-profile">
                            <h2>Welcome, {userData.name}</h2>
                            <h4><Badge style={{ backgroundColor: "#55BCC9" }} variant="secondary">{userData.city}, {userData.country}</Badge></h4>
                            <h3 style={{ marginTop: "20px" }}>Profile</h3>
                            <div className="dashboard-item">
                                <div className="dashboard-item-name">
                                    <h6>Email: </h6>
                                </div>
                                <div className="dashboard-item-value">
                                    <h6>{user.email}</h6>
                                </div>
                            </div>
                            <div className="dashboard-item">
                                <div className="dashboard-item-name">
                                    <h6>Cohort: </h6>
                                </div>
                                <div className="dashboard-item-value">
                                    <h6>{userData.cohort}</h6>
                                </div>
                            </div>
                            <div className="dashboard-item">
                                <div className="dashboard-item-name">
                                    <h6>Bio: </h6>
                                </div>
                                <div className="dashboard-item-value">
                                    <h6>{userData.bio}</h6>
                                </div>
                            </div>
                            <div className="dashboard-item">
                                <div className="dashboard-item-name">
                                    <h6>Age: </h6>
                                </div>
                                <div className="dashboard-item-value">
                                    <h6>{userData.age}</h6>
                                </div>
                            </div>
                            <div className="dashboard-item">
                                <div className="dashboard-item-name">
                                    <h6>Skills: </h6>
                                </div>
                                <div className="dashboard-item-value">
                                    {userData.skills.map(skill => <h6>{skill}</h6>)}
                                </div>
                            </div>
                            <div className="dashboard-item">
                                <div className="dashboard-item-name">
                                    <h6>Hobbies: </h6>
                                </div>
                                <div className="dashboard-item-value">
                                    {userData.hobbies.map(hobby => <h6>{hobby}</h6>)}
                                </div>
                            </div>
                            <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }}>
                                Edit Profile
                            </Button>
                        </div>
                        {(opportunities && opportunities.length) ? (<div className="dashboard-opportunities">
                            <h3>Suggested Opportunities</h3>
                            <br />
                            {opportunities.map(opportunity => <Opportunity 
                                name={opportunity.name}
                                organization={opportunity.organization}
                                description={opportunity.description}
                                about={opportunity.about}
                                requirements={opportunity.requirements}
                                skills={opportunity.skills}
                                volunteer={opportunity.volunteer}
                            />)}
                        </div>) : (<div className="dashboard-opportunities">
                            <h3>Suggested Opportunities</h3>
                            <br />
                            <p>There are currently no suggested opportunities.</p>
                        </div>)}
                    </div>
                    <Alert variant="danger" show={error} style={{width: "90%"}}>{error ? `${error.message} ` : ""}</Alert>
                </div>
            </> : <>
                    <Loading />
                </>}
        </>

    )
}

export default Dashboard;