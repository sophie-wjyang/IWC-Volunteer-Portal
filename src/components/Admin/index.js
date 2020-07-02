import React, { useState, useEffect } from 'react';
import app, { db } from '../Firebase';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { Button, Alert, Tabs, Tab /*Form, Card, Badge*/ } from 'react-bootstrap';
import NewModal from './NewModal';
import AdminCard from './AdminCard';
import UserCard from './UserCard';
import Submissions from './Submissions';
import Requests from './Requests';
import Responses from './Responses'
import './styles.css';

function Admin() {

    // const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);
    //const [opportunities, setOpportunities] = useState([]);
    //const [opportunityIds, setOpportunityIds] = useState([]);
    const [newOpportunity, setNewOpportunity] = useState(false);
    const [allDocs, setAllDocs] = useState([]);
    const [userList, setUserList] = useState([]);

    //const [editOpportunity, setEditOpportunity] = useState(null);

    //let oppIds;

    //const [orderQuery, setOrderQuery] = useState("added");
    //const [orderBy, setOrderBy] = useState("desc")
    //const [cohort, setCohort] = useState("all");

    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            // setUser(user);
            if (user) {
                db.collection("users").doc(`${user.uid}`).get().then(doc => {
                    setAdmin(doc.data().admin);
                })
            }

            db.collection("opportunities").orderBy('available', 'desc').orderBy('added', 'desc').get().then(querySnapshot => {
                //let opps = [];
                //let oppIds = [];
                let docs = [];
                querySnapshot.forEach(doc => {
                    //opps.push(doc.data());
                    //oppIds.push(doc.id);
                    docs.push(doc);
                })
                //let ids = [];
                //oppIds.forEach(val => {
                //    ids[`${val}`] = false;
                //});
                //setOpportunityIds(ids);
                //setOpportunities(opps);

                let arr;
                let bigArr = [];
                for (let i = 0; i < docs.length; i += 3) {
                    if (i + 3 <= docs.length) {
                        arr = [];
                        arr.push(docs[i]); arr.push(docs[i + 1]); arr.push(docs[i + 2]);
                        bigArr.push(arr);
                    } else if (i + 2 === docs.length) {
                        arr = [];
                        arr.push(docs[i]); arr.push(docs[i + 1]);
                        bigArr.push(arr);
                    } else if (i + 1 === docs.length) {
                        arr = [];
                        arr.push(docs[i]);
                        bigArr.push(arr);
                    }
                }
                //console.log(bigArr);
                setAllDocs(bigArr);

                /*let array;
                let bigArray = [];
                for (let i = 0; i < opps.length; i += 3) {
                    if (i + 3 <= opps.length) {
                        array = [];
                        array.push(opps[i]); array.push(opps[i + 1]); array.push(opps[i + 2]);
                        bigArray.push(array);
                    } else if (i + 2 === opps.length) {
                        array = [];
                        array.push(opps[i]); array.push(opps[i + 1]);
                        bigArray.push(array);
                    } else if (i + 1 === opps.length) {
                        array = [];
                        array.push(opps[i]);
                        bigArray.push(array);
                    }
                }
                setOpportunities(bigArray);*/
            }).catch(error => setError(error));

            db.collection("users").orderBy("name").get().then(querySnapshot => {
                let users = [];
                querySnapshot.forEach(userData => {
                    //opps.push(doc.data());
                    //oppIds.push(doc.id);
                    //if (userData.id !== user.uid) {
                        users.push(userData);
                    //}
                });
                setUserList(users);
            })

            setPending(false);
        })
    }, []);

    /*useEffect(() => {
        if (cohort !== 'all') {
            if (orderBy === 'incr') {
                db.collection("opportunities").where('cohort', '==', `${cohort}`).orderBy(`${orderQuery}`)
            }
        } else {
            if (orderBy === 'incr') {
                db.collection("opportunities").where('cohort', )
            }
        }
    }, [orderQuery, orderBy, cohort])*/

    if (pending || admin == null) {
        return <Loading />
    }

    return (
        <>
            {(admin !== null && admin) ? (<>
                <Tabs defaultActiveKey="opportunities" id="uncontrolled-tab-example">
                    <Tab eventKey="opportunities" title="Opportunities">
                        <div className="admin-container">
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: "30px" }}>
                                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => setNewOpportunity(true)}>Add Opportunity</Button>
                                <NewModal show={newOpportunity} onHide={() => { setNewOpportunity(false); window.location.reload() }} />
                            </div>
                            <div className="admin-opportunities">
                                <h1 style={{ alignSelf: "flex-start", margin: "20px" }}>All Opportunities</h1>
                                {/*<div className="admin-sort">
                            <Form inline>

                            </Form>
                        </div>*/}

                                {/*<AdminCards docs={allDocs} />*/}

                                {allDocs.map(group => <div className="admin-opportunities-row">
                                    {group.map(opportunity => <AdminCard opportunity={opportunity} />)}
                                </div>)}

                                {/*allDocs.map(group => <div className="admin-opportunities-row">
                            {group.map(opportunity => <Card className="opportunity-card">
                                <Card.Body>
                                    <Card.Title><h4>{opportunity.data().name}</h4></Card.Title>

                                    <h5>{opportunity.data().organization}</h5>
                                    <h5>{opportunity.data().partnership ? (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">IWC Partnership</Badge>) : (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Opportunity</Badge>)}</h5>
                                    <h6>{opportunity.data().cohort}</h6>
                                    <Card.Text>
                                        <small>Posted on {opportunity.data().added.toDate().toLocaleDateString(undefined, options)}</small>
                                        <br />
                                        <small>Last updated on {opportunity.data().updated.toDate().toLocaleDateString(undefined, options)}</small>
                                    </Card.Text>
                                    <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => {
                                        oppIds = opportunityIds;
                                        oppIds[`${opportunity.id}`] = true;
                                        console.log(oppIds[`${opportunity.id}`]);
                                        setOpportunityIds(oppIds);
                                    }}>Edit</Button>
                                </Card.Body>
                                <Button onClick={() => console.log(opportunityIds[`${opportunity.id}`])}>{oppIds && oppIds[`${opportunity.id}`]}</Button>
                                <EditModal show={opportunityIds && opportunityIds[`${opportunity.id}`]} onHide={() => {
                                    oppIds[`${opportunity.id}`] = false;
                                    setOpportunityIds(oppIds);
                                }} opportunity={opportunity.data()} />
                            </Card>)}
                        </div>)*/}

                                {/*opportunities.map(group => <div className="admin-opportunities-row">
                            {group.map(opportunity => <Card className="opportunity-card">
                                <Card.Body>
                                    <Card.Title><h4>{opportunity.name}</h4></Card.Title>
                                    <h5>{opportunity.organization}</h5>
                                    <h5>{opportunity.partnership ? (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">IWC Partnership</Badge>) : (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Opportunity</Badge>)}</h5>
                                    <h6>{opportunity.cohort}</h6>
                                    <Card.Text>
                                        <small>Posted on {opportunity.added.toDate().toLocaleDateString(undefined, options)}</small>
                                        <br />
                                        <small>Last updated on {opportunity.updated.toDate().toLocaleDateString(undefined, options)}</small>
                                    </Card.Text>
                                    <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => setNewOpportunity(true)}>Edit</Button>
                                </Card.Body>
                                {<EditModal show={editOpportunity} onHide={() => setNewOpportunity(false)} opportunity={opportunity} />}
                            </Card>)}
                        </div>)*/}
                            </div>
                            <Alert variant="danger" show={error}>{error ? error.message : ""}</Alert>
                        </div>
                    </Tab>
                    <Tab eventKey="users" title="Users">
                        <div className="admin-container">
                            <div className="admin-opportunities">
                                <h1 style={{ alignSelf: "flex-start", margin: "20px" }}>Manage Users</h1>
                                <div style={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" }}>
                                    {userList.map(listUser => <UserCard user={listUser} />)}
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="submissions" title="Submissions">
                        <div className="admin-container">
                            <div className="other-container-thing">
                                <h1>Manage Submissions</h1>
                                <Submissions />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="requests" title="Requests">
                        <div className="admin-container">
                            <div className="other-container-thing">
                                <h1>Manage Requests</h1>
                                <Requests />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="data" title="Data">
                        <div className="admin-container">
                            <div className="other-container-thing">
                                <Responses />
                            </div>
                        </div>
                    </Tab>
                </Tabs>

            </>) : (<>
                <Redirect to="/dashboard" />
            </>)}
        </>
    )
};

export default Admin;