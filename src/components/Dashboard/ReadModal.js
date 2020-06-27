import React, {useState} from 'react';
import { Modal, Badge } from 'react-bootstrap';
import ReadText from '../Editor/ReadText';
import { EditorState, convertFromRaw,  } from 'draft-js';

function ReadModal(props) {

    const opportunity = props.opportunity.name;
    const organization = props.opportunity.organization;
    const partnership = props.opportunity.partnership;
    const cohort = props.opportunity.cohort;
    const skills = props.opportunity.skills;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric', minute: 'numeric' };

    const added = props.opportunity.added.toDate().toLocaleDateString(undefined, options);
    const updated = props.opportunity.updated.toDate().toLocaleDateString(undefined, options);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(props.opportunity.description)));

    


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

return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="modal-new-opportunities"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>{opportunity}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>{organization} {partnership ? (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">IWC Partnership</Badge>) : (<Badge style={{ backgroundColor: "#55BCC9" }} variant="info">Opportunity</Badge>)}</h5>
            <h6>Cohort: {cohort}</h6>
            <h6>Skills: </h6>
            <ul>
                {skills.map(skill => <li>{skill}</li>)}
            </ul>
            <h6>Description: </h6>
            <ReadText editorState={editorState} setEditorState={setEditorState} />
        </Modal.Body>
        <Modal.Footer>
            <small style={{ marginRight: "auto" }}>Posted on {added}</small>
            <small>Last updated on {updated}</small>
        </Modal.Footer>
    </Modal>
)
}

export default ReadModal;