import React, { useState } from 'react';
import { Modal, Button, Form, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditText from '../Editor/EditText';
import { EditorState, convertToRaw } from 'draft-js';
import { db } from '../Firebase';

function NewModal(props) {

    const [opportunity, setOpportunity] = useState("");
    const [organization, setOrganization] = useState("");
    const [partnership, setPartnership] = useState(false);
    const [cohort, setCohort] = useState("Select");
    const [skills, setSkills] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const save = () => {

        db.collection("opportunities").add({
            name: `${opportunity}`,
            organization: `${organization}`,
            partnership: partnership,
            cohort: `${cohort}`,
            skills: skills,
            description: convertToRaw(editorState.getCurrentContent()),
            added: new Date(Date.now()),
            updated: new Date(Date.now()),
            reviews: [],
            available: true,
        }).then(() => {
            clear();
            setSuccess("The opportunity was successfully saved.")
        }).catch(error => {
            setError(error);
        });
    }

    const clear = () => {
        setError(null);
        setSuccess(null);
        setOpportunity("");
        setOrganization("");
        setPartnership(false);
        setCohort("Select");
        setSkills([]);
        setEditorState(EditorState.createEmpty());
    }

    function renderTooltip(props) {
        return (
            <Tooltip id="multiselect-tooltip" {...props}>
                CTRL/CMD + Click to select multiple.
            </Tooltip>
        );
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="modal-new-opportunities"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>New Opportunity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Opportunity Name</Form.Label>
                        <Form.Control required type="text" placeholder="Opportunity Name" value={opportunity} onChange={event => setOpportunity(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control required type="text" placeholder="Organization Name" value={organization} onChange={event => setOrganization(event.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Partnership/Opportunity</Form.Label>
                        <Form.Check type="checkbox" label="This is a partnership" checked={partnership} value={partnership} onChange={() => {setPartnership(!partnership);}} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opportunity Cohort</Form.Label>
                        <Form.Control required as="select" value={cohort} onChange={event => setCohort(event.target.value)}>
                            <option value="Select">Select</option>
                            <option value="Care Centers">Care Centers</option>
                            <option value="Public Health">Public Health</option>
                            <option value="Fundraising">Fundraising</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Opportunity Skills</Form.Label>
                        <Form.Text style={{ marginTop: "-6px", marginBottom: "10px" }} muted><OverlayTrigger placement="right" delay={{ show: 50, hide: 150 }} overlay={renderTooltip}><strong>Help?</strong></OverlayTrigger></Form.Text>
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
                    <Form.Group>
                        <Form.Label>Opportunity Description</Form.Label>
                        <EditText editorState={editorState} setEditorState={setEditorState} />
                    </Form.Group>

                </Form>



            </Modal.Body>
            <Modal.Footer>
                <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
                <Alert variant="success" show={success}>{success}</Alert>
                <Button variant="primary" onClick={clear}>Clear</Button>
                <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} disabled={opportunity === '' || organization === '' || cohort === 'Select' || skills === []} onClick={save}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal;