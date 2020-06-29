import React, { useState } from 'react';
import { Modal, Badge } from 'react-bootstrap';
import ReadText from '../Editor/ReadText';
import { EditorState, convertFromRaw, } from 'draft-js';
//import { db } from '../Firebase';

function ReadModal(props) {

    const opportunity = props.opportunity.name;
    const organization = props.opportunity.organization;
    const partnership = props.opportunity.partnership;
    const cohort = props.opportunity.cohort;
    const skills = props.opportunity.skills;
    const reviews = props.opportunity.reviews;

    //const [submissions, setSubmissions] = useState([]);

    //const [error, setError] = useState(null);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const added = props.opportunity.added.toDate().toLocaleDateString(undefined, options);
    const updated = props.opportunity.updated.toDate().toLocaleDateString(undefined, options);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(props.opportunity.description)));




    /*useEffect(() => {
        db.collection("submissions").where('opportunityid', '==', `${props.id}`).get().then(querySnapshot => {
            let subs = [];
            querySnapshot.forEach(sub => {
                subs.push(sub);
            })
            setSubmissions(subs);
        }).catch(error => setError(error));
    }, [props.id])*/

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
                <br />
                {/*<h6>Submissions: </h6>
                {(submissions.length > 0) ? <ul>
                    {submissions.map(submission => {
                        db.collection("users").doc(`${submission.userid}`).get().then(doc => {
                            return <li>
                        {doc.data().name} submitted {submission.data().submissionLink} on {submission.data().timeSubmitted.toDate().toLocaleDateString(undefined, options)}
                    </li>
                        });
                    })}
                </ul> : <p>No submissions made.</p>}*/}
                <h6>Reviews: </h6>
                {(reviews && reviews.length > 0) ? <ul>
                    {reviews.map(review => <li>
                        {review}
                    </li>)}
                </ul> : <p>No reviews.</p>}
            </Modal.Body>
            <Modal.Footer>
                <small style={{ marginRight: "auto" }}>Posted on {added}</small>
                <small>Last updated on {updated}</small>
            </Modal.Footer>
            {/*<Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>*/}
        </Modal>
    )
}

export default ReadModal;