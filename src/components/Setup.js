import React, { useState, useEffect } from 'react';
import app, { db } from './Firebase';
import Loading from './Loading';
import { Card, Alert, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Setup() {

    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);

    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    const [location, setLocation] = useState(null);
    const [cohort, setCohort] = useState("Select");
    const [skills, setSkills] = useState([]);
    const [hobbies, setHobbies] = useState(null);
    const [bio, setBio] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            setUser(user)
            setPending(false);
        })
    }, []);

    if (pending) {
        return <Loading />;
    } else {
        db.collection("users").doc(`${user.uid}`).get().then(doc => {
            if (doc.data().quizCompleted) {
                window.location.replace("/dashboard");
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        // TODO -- implement handle submit function --> database
    }

    function renderTooltip(props) {
        return (
          <Tooltip id="multiselect-tooltip" {...props}>
            CTRL/CMD + Click to select multiple.
          </Tooltip>
        );
      }

    return (
        <div style={{ width: "100%", paddingTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Card>
                <Card.Body>
                    <Card.Title>Help Us Get To Know You Better</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Your Name" value={name} onChange={event => setName(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control required type="number" placeholder="Your Age" value={age} onChange={event => setAge(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control required type="text" placeholder="Your Location" value={location} onChange={event => setLocation(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formCohorts">
                            <Form.Label>Cohort</Form.Label>
                            <Form.Text style={{ marginTop: "-6px", marginBottom: "10px" }} muted>Please select the cohort that you are most interested in.<br />For more information about cohorts, see <a href="https://impactwithoutcontact.ca">here</a>.<br />You can change this later.</Form.Text>
                            <Form.Control required as="select" value={cohort} onChange={event => setCohort(event.target.value)}>
                                <option>Select</option>
                                <option>Care Centers</option>
                                <option>Public Health</option>
                                <option>Fundraising</option>
                                <option>Lifestyle</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSkills">
                            <Form.Label>Skills</Form.Label>
                            <Form.Text style={{  marginTop: "-6px", marginBottom: "10px" }} muted>What opportunities are you most suited for?<br />Please select all that apply. <OverlayTrigger placement="right" delay={{ show: 50, hide: 150 }} overlay={renderTooltip}><strong>Help?</strong></OverlayTrigger></Form.Text>
                            <Form.Control required as="select" multiple value={skills} onChange={event => {
                                const options = event.target.options;
                                let value = [];
                                for (let i = 0, l = options.length; i < l; i++) {
                                  if (options[i].selected) {
                                    value.push(options[i].value);
                                  }
                                }
                                setSkills(value);
                            }}>
                                <option value="Drawing/Painting">Drawing/Painting</option>
                                <option value="Video Editing">Video Editing</option>
                                <option value="Sewing">Sewing</option>
                                <option value="Graphic Design/Digital Art">Graphic Design/Digital Art</option>
                                <option value="Writing/Blogging">Writing/Blogging</option>
                                <option value="Oral Communication Skills">Oral Communication Skills (Chatting, Conversations)</option>
                                <option value="Written Communications">Written Communications (Writing Letters)</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formHobbies">
                            <Form.Label>Hobbies</Form.Label>
                            <Form.Text style={{  marginTop: "-6px", marginBottom: "10px" }} muted>If you were to write for our blog, what would you write about?<br />Please select all that apply.  <OverlayTrigger placement="right" delay={{ show: 50, hide: 150 }} overlay={renderTooltip}><strong>Help?</strong></OverlayTrigger></Form.Text>
                            <Form.Control required as="select" multiple value={hobbies} onChange={event => {
                                const options = event.target.options;
                                let value = [];
                                for (let i = 0, l = options.length; i < l; i++) {
                                  if (options[i].selected) {
                                    value.push(options[i].value);
                                  }
                                }
                                setHobbies(value);
                            }}>
                                <option value="Music">Music</option>
                                <option value="Film/TV">Film/TV</option>
                                <option value="Sports">Sports</option>
                                <option value="Culinary Crafts">Culinary Crafts</option>
                                <option value="Languages">Languages</option>
                                <option value="Reading">Reading</option>
                                <option value="Tech">Tech</option>
                                <option value="Podcasts/TED Talks">Podcasts/TED Talks</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bio</Form.Label>
                            <Form.Text style={{  marginTop: "-6px", marginBottom: "10px" }} muted>Please enter a short bio. (max 150 characters)</Form.Text>
                            <Form.Control required as="textarea" rows="3" value={bio} maxLength={150} onChange={event => setBio(event.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <br />
            <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
        </div>
    )
}

export default Setup;