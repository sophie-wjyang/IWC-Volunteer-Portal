import React, { useState, /*useEffect*/ } from 'react';
import { Modal, Button, Form, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditText from '../Editor/EditText';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { db } from '../Firebase';

function EditModal(props) {

    const [opportunity, setOpportunity] = useState(props.opportunity.name);
    const [organization, setOrganization] = useState(props.opportunity.organization);
    const [partnership, setPartnership] = useState(props.opportunity.partnership);
    const [cohort, setCohort] = useState(props.opportunity.cohort);
    const [skills, setSkills] = useState();
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(props.opportunity.description)));
    const [form, setForm] = useState(props.opportunity.form);
    const available = props.opportunity.available;

    const id = props.id;

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [permanentlyDeleted, setPermanentlyDeleted] = useState(false);
    const [restored, setRestored] = useState(false);
    const [permanentlyDeleteModal, setPermanentlyDeleteModal] = useState(false);

    /*useEffect(() => {
        db.collection("opportunities").doc(`${props.id}`).get().then(doc => {
            setOpportunity(doc.data().name);
            setOrganization(doc.data().organization);
            setPartnership(doc.data().partnership);
            setCohort(doc.data().cohort);
            setSkills(doc.data().skills);
            setEditorState(EditorState.createWithContent(convertFromRaw(doc.data().description)));
        }).catch(error => setError(error));
    }, [props])*/

    const save = () => {
        if (skills && skills.length > 0) {
            db.collection("opportunities").doc(`${id}`).update({
                name: `${opportunity}`,
                organization: `${organization}`,
                partnership: partnership,
                cohort: `${cohort}`,
                skills: skills,
                description: convertToRaw(editorState.getCurrentContent()),
                form: form ? form : "",
                updated: new Date(Date.now())
            }).then(() => {
                setSuccess("The opportunity was successfully saved.")
                window.location.reload();
            }).catch(error => {
                setError(error);
            });
        } else {
            db.collection("opportunities").doc(`${id}`).update({
                name: `${opportunity}`,
                organization: `${organization}`,
                partnership: partnership,
                cohort: `${cohort}`,
                description: convertToRaw(editorState.getCurrentContent()),
                form: form ? form : "",
                updated: new Date(Date.now())
            }).then(() => {
                setSuccess("The opportunity was successfully saved.")
                window.location.reload();
            }).catch(error => {
                setError(error);
            });
        }
    }

    const deleteOpportunity = () => {
        db.collection("opportunities").doc(`${id}`).update({
            available: false
        }).then(() => {
            setSuccess("The opportunity was successfully deleted.")
            setDeleted(true);
            setDeleteModal(false);
        }).catch(error => setError(error));
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
                <Modal.Title>Edit Opportunity</Modal.Title>
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
                        <Form.Check type="checkbox" label="This is a partnership" checked={partnership} onChange={() => { setPartnership(!partnership); }} />
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
                    <Form.Group>
                        <Form.Label>Submission Form</Form.Label>
                        <Form.Control type="url" placeholder="Link to form for opportunity submissions. Leave blank if not applicable." value={form} onChange={event => setForm(event.target.value)} />
                    </Form.Group>
                </Form>



            </Modal.Body>
            <Modal.Footer>
                <Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>
                <Alert variant="success" show={success}>{success}</Alert>
                {available ? (<>
                    <Button variant="primary" onClick={() => setDeleteModal(true)} disabled={deleted}>Delete</Button>
                    <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} disabled={opportunity === '' || organization === '' || cohort === 'Select' || skills === [] || deleted} onClick={save}>Save</Button>
                </>) : (<>
                    <Button variant="primary" disabled={restored || permanentlyDeleted} onClick={() => {
                        setPermanentlyDeleteModal(true);
                    }}>Permanently Delete</Button>
                    <Button variant="success" disabled={restored || permanentlyDeleted} onClick={() => {
                        db.collection("opportunities").doc(`${id}`).update({
                            available: true
                        }).then(() => {
                            setSuccess("The opportunity was successfully restored.")
                            setDeleted(false);
                            setRestored(true);
                        }).catch(error => setError(error));
                    }}>Restore Opportunity</Button>
                </>)}
                <Modal show={deleteModal} onHide={() => setDeleteModal(false)} size="sm" aria-labelledby="modal-new-opportunities" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to delete this opportunity?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => { deleteOpportunity(); }}>Yes I'm sure</Button>
                    </Modal.Body>
                </Modal>
                <Modal show={permanentlyDeleteModal} onHide={() => setPermanentlyDeleteModal(false)} size="sm" aria-labelledby="modal-new-opportunities" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to permanently delete this opportunity?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Warning: This may result in unexpected errors, users may not be able to see some of their previously completed opportunities.</p>
                        <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} onClick={() => {
                            db.collection("opportunities").doc(`${id}`).delete().then(() => {
                                setSuccess("The opportunity was successfully deleted.")
                                setPermanentlyDeleted(true);
                                setPermanentlyDeleteModal(false);
                            }).catch(error => setError(error));
                        }}>Yes I'm sure</Button>
                    </Modal.Body>
                </Modal>
            </Modal.Footer>
        </Modal>
    )
}

export default EditModal;