import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button } from 'react-bootstrap';
import app, { db } from '../Firebase'
import Loading from '../Loading';
import './index.css';
import Opportunity from './Opportunity';
import PasswordModal from './PasswordModal';

function Dashboard() {

    const [user, setUser] = useState(null);
    // const [pending, setPending] = useState(true);
    const [complete, setComplete] = useState(false);
    const [error, setError] = useState(false);
    const [opportunities, setOpportunities] = useState(null);

    const [userData, setUserData] = useState(null);
    const [passwordModal, setPasswordModal] = useState(false);

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
                let opps = [];
                db.collection("opportunities").where("cohort", "==", `${cohort}`).orderBy('updated', 'desc').limit(4).get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                }).catch(error => setError(error));
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
                    <div style={{ width: "80%", margin: "20px" }}>
                        <h1>IWC Dashboard</h1>
                        <p>Welcome to your IWC dashboard! Here, you’ll find your profile, which includes your top cohort, skills, and hobbies (you can change this at any time). Here you’ll also find 3 personalized opportunity recommendations. If you’re not interested in the ones recommended, you can also go to <a className="link" href="/opportunities">opportunities</a> and view all of our volunteering initiatives.</p>

                        <p>One important distinction to note is general opportunities versus partnerships. Partnerships are organizations that have established a cooperation with IWC, meaning you won’t need to apply for the position. We’ll guide you through the initiative and connect you to the organization. General opportunities, on the other hand, are organizations not affiliated with IWC that are looking for volunteers. We’ll provide you with a description of the role, requirements, and a link to sign up, but we won’t be able to connect you with the organization. If, however, they are unable to give volunteer hours, we’re happy to sign it off for you.</p>

                        <p>If at any time you have any questions or concerns, feel free to email us at <a className="link" href="mailto:impactwithoutcontact@gmail.com">impactwithoutcontact@gmail.com</a> or message us on instagram <a className="link" href="https://instagram.com/impactwithoutcontact" target="_blank" rel="noopener noreferrer">@impactwithoutcontact</a>.</p>
                    </div>
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
                            <div style={{ width: "90%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445", marginRight: "20px" }} onClick={() => window.location.replace("/edit")}>
                                    Edit Profile
                                </Button>
                                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445", marginRight: "20px" }} onClick={() => setPasswordModal(true)}>
                                    Change Password
                                </Button>
                                <PasswordModal show={passwordModal} onHide={() => setPasswordModal(false)} />
                            </div>
                        </div>
                        {(opportunities) ? (<div className="dashboard-opportunities">
                            <h3>Suggested Opportunities</h3>
                            <div className="dashboard-opportunities-card-container">{opportunities.map(opportunity => <Opportunity
                                opportunity={opportunity.data()}
                            />)}</div>
                        </div>) : (<div className="dashboard-opportunities">
                            <h3>Suggested Opportunities</h3>
                            <br />
                            <p>There are currently no suggested opportunities.</p>
                        </div>)}
                    </div>
                    <Alert variant="danger" show={error} style={{ width: "90%" }}>{error ? `${error.message} ` : ""}</Alert>
                </div>
            </> : <>
                    <Loading />
                </>}
        </>

    )
}

export default Dashboard;