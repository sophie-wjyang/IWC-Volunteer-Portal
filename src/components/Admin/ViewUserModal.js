import React from 'react';
import { Modal } from 'react-bootstrap';
//import { db } from '../Firebase';

function ViewUserModal(props) {

    const name = props.user.name;
    const email = props.user.email;
    const city = props.user.city;
    const country = props.user.country;
    const cohort = props.user.cohort;
    const bio = props.user.bio;
    const age = props.user.age;
    const languages = props.user.languages;
    const skills = props.user.skills;
    const hobbies = props.user.hobbies;
    const dateCreated = props.user.dateCreated;
    const lastLoggedIn = props.user.lastLoggedIn;
    const heard = props.user.heard;
    //const [submissions, setSubmissions] = useState([]);
    //const [opportunities, setOpportunities] = useState([]);

    //const [error, setError] = useState(null);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    /*useEffect(() => {
        db.collection("submissions").where("userid", "==",`${props.id}`).get().then(querySnapshot => {
            let subs = [];
            querySnapshot.forEach(sub => {
                subs.push(sub);
            });
            setSubmissions(subs);
            return subs;
        }).then(subs => {
            let opps = [];
            subs.forEach(sub => {
                db.collection("opportunities").doc(`${sub.data().opportunityid}`).get().then(doc => {
                    opps.push(doc);
                });
            })
            setOpportunities(opps);
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
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Email: {email}</h6>
                <h6>Location: {city}, {country}</h6>
                <h6>Age: {age}</h6>
                <h6>Cohort: {cohort}</h6>
                <h6>Bio: </h6>
                <p>{bio}</p>
                <h6>Languages: </h6>
                <ul>
                    {languages && languages.map(language => <li>{language}</li>)}
                </ul>
                <h6>Skills: </h6>
                <ul>
                    {skills && skills.map(skill => <li>{skill}</li>)}
                </ul>
                <h6>Hobbies: </h6>
                <ul>
                    {hobbies && hobbies.map(hobby => <li>{hobby}</li>)}
                </ul>
                <h6>Heard about IWC from: {heard}</h6>
                <br />
                {/*<h6>Submissions: </h6>*}
                {/*(submissions.length > 0) ? <ul>
                    {submissions.map(submission => {
                        let opportunity = opportunities.filter(opp => {return opp.id === submission.data().opportunityid});
                        return <li>
                        {opportunity.data().name}: {opportunity.data().organization} on {submission.data().timeSubmitted.toDate().toLocaleDateString(undefined, options)}
                    </li>
                    })}
                </ul> : <p>No submissions made.</p>*/}
            </Modal.Body>
            <Modal.Footer>
                <small style={{ marginRight: "auto" }}>Account created on {dateCreated && dateCreated.toDate().toLocaleDateString(undefined, options)}</small>
                <small>Last logged in on {lastLoggedIn && lastLoggedIn.toDate().toLocaleDateString(undefined, options)}</small>
            </Modal.Footer>
            {/*<Alert variant="danger" show={error}>{error ? `${error.message}` : ""}</Alert>*/}
        </Modal>
    )
}

export default ViewUserModal;