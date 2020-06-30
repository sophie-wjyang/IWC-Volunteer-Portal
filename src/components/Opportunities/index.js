import React, { useState, useEffect } from 'react';
import { Alert, Form } from 'react-bootstrap';
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

    const [sort, setSort] = useState(['updated', 'desc']);
    const [cohort, setCohort] = useState('All');
    const [skill, setSkill] = useState('All');

    const updated_newest = ['updated', 'desc'];
    const updated_oldest = ['updated'];
    const added_newest = ['added', 'desc'];
    const added_oldest = ['added'];

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
        setError(null);
        if (sort.length === 1) {
            if (cohort === 'All' && skill === 'All') {
                db.collection("opportunities").where("available", "==", true).orderBy(sort[0]).get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            } else if (skill === 'All') {
                db.collection("opportunities").where("available", "==", true).where("cohort", "==", cohort).orderBy(sort[0]).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            } else if (cohort === 'All') {
                db.collection("opportunities").where("available", "==", true).where("skills", "array-contains", skill).orderBy(sort[0]).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            } else {
                db.collection("opportunities").where("available", "==", true).where("cohort", "==", cohort).where("skills", "array-contains", skill).orderBy(sort[0]).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            }
        } else {
            if (cohort === 'All' && skill === 'All') {
                db.collection("opportunities").where("available", "==", true).orderBy(sort[0], sort[1]).get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            } else if (skill === 'All') {
                db.collection("opportunities").where("available", "==", true).where("cohort", "==", cohort).orderBy(sort[0], sort[1]).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            } else if (cohort === 'All') {
                db.collection("opportunities").where("available", "==", true).where("skills", "array-contains", skill).orderBy(sort[0], sort[1]).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            } else {
                db.collection("opportunities").where("available", "==", true).where("cohort", "==", cohort).where("skills", "array-contains", skill).orderBy(sort[0], sort[1]).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        opps.push(doc);
                    });
                    setOpportunities(opps);
                    setPending(false);
                }).catch(error => { setError(error); setPending(false) });
            }
        }




    }, [sort, cohort, skill]);

    return (
        <>
            {complete && !pending ? <>
                <div className="opportunities-container">
                    {(opportunities) ? (<div className="opportunities-opportunities">
                        <h3>Opportunities List</h3>
                        <br />
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: "5px" }}>
                            <h5 style={{ margin: "5px" }}>Sort: </h5>
                            <Form inline>
                                <Form.Group className="oppsort-section">
                                    <Form.Control as="select" value={sort} onChange={event => {
                                        if (event.target.value === 'updated,desc') {
                                            setSort(updated_newest)
                                        } else if (event.target.value === 'updated') {
                                            setSort(updated_oldest)
                                        } else if (event.target.value === 'added,desc') {
                                            setSort(added_newest);
                                        } else if (event.target.value === 'added') {
                                            setSort(added_oldest);
                                        }
                                    }}>
                                        <option value={updated_newest}>Date Updated, Newest</option>
                                        <option value={updated_oldest}>Date Updated, Oldest</option>
                                        <option value={added_newest}>Date Added, Newest</option>
                                        <option value={added_oldest}>Date Added, Oldest</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="oppsort-section">
                                    <Form.Label style={{ marginRight: "5px" }}>Cohort: </Form.Label>
                                    <Form.Control as="select" value={cohort} onChange={event => setCohort(event.target.value)}>
                                        <option value="All">All Cohorts</option>
                                        <option value="Care Centers">Care Centers</option>
                                        <option value="Public Health">Public Health</option>
                                        <option value="Fundraising">Fundraising</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                        <option value="Other">Other</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className="oppsort-section">
                                    <Form.Label style={{ marginRight: "5px" }}>Skill: </Form.Label>
                                    <Form.Control as="select" value={skill} onChange={event => setSkill(event.target.value)}>
                                        <option value="All">All Skills</option>
                                        <option value="Drawing/Painting">Drawing/Painting</option>
                                        <option value="Video Editing">Video Editing</option>
                                        <option value="Sewing">Sewing</option>
                                        <option value="Graphic Design/Digital Art">Graphic Design/Digital Art</option>
                                        <option value="Writing/Blogging">Writing/Blogging</option>
                                        <option value="Oral Communication Skills">Oral Communication Skills</option>
                                        <option value="Written Communications">Written Communications</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="opportunities-card-container">{opportunities.map(opportunity => {
                            const submitted = (user.data().completed.includes(opportunity.id));
                            return <Opportunity
                                opportunity={opportunity} user={user} submitted={submitted}
                            />
                        })}</div>
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