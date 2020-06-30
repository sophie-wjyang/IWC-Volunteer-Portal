import React, { useState, useEffect } from 'react';
import app, { db } from './Firebase';
import Loading from './Loading';
import { Card, Alert, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Setup() {

    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);

    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("Select");
    const [cohort, setCohort] = useState("Select");
    const [skills, setSkills] = useState([]);
    const [hobbies, setHobbies] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [bio, setBio] = useState("");
    const [admin, setAdmin] = useState(false);
    const [heard, setHeard] = useState("");

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
            if (doc.data().admin) {
                setAdmin(true);
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        db.collection("users").doc(`${user.uid}`).update({
            name: `${name}`,
            email: user.email,
            age: age,
            city: `${city}`,
            country: `${country}`,
            cohort: `${cohort}`,
            skills: skills,
            hobbies: hobbies,
            bio: `${bio}`,
            languages: languages,
            heard: `${heard}`,
            quizCompleted: true,
            admin: admin,
            completed: [""]
        }).then(() => {
            window.location.replace("/dashboard");
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
        <div style={{ width: "100%", paddingTop: "20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Card className="card-form-profile">
                <Card.Body>
                    <Card.Title>Help Us Get To Know You Better</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control required type="text" placeholder="Your Name" value={name} onChange={event => setName(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control required type="number" placeholder="Your Age" min="10" max="120" value={age} onChange={event => setAge(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control style={{ marginBottom: "10px" }} required type="text" placeholder="Your City" value={city} onChange={event => setCity(event.target.value)} />
                            <Form.Control required as="select" value={country} onChange={event => setCountry(event.target.value)}>
                                <option value="Select">Select</option>
                                <option value="Afganistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bonaire">Bonaire</option>
                                <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Canary Islands">Canary Islands</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Channel Islands">Channel Islands</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos Island">Cocos Island</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote DIvoire">Cote DIvoire</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Curaco">Curacao</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands">Falkland Islands</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Ter">French Southern Ter</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Great Britain">Great Britain</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="India">India</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea North">Korea North</option>
                                <option value="Korea Sout">Korea South</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Midway Islands">Midway Islands</option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Nambia">Nambia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherland Antilles">Netherland Antilles</option>
                                <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                <option value="Nevis">Nevis</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau Island">Palau Island</option>
                                <option value="Palestine">Palestine</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Phillipines">Philippines</option>
                                <option value="Pitcairn Island">Pitcairn Island</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Republic of Montenegro">Republic of Montenegro</option>
                                <option value="Republic of Serbia">Republic of Serbia</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russia</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="St Barthelemy">St Barthelemy</option>
                                <option value="St Eustatius">St Eustatius</option>
                                <option value="St Helena">St Helena</option>
                                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                <option value="St Lucia">St Lucia</option>
                                <option value="St Maarten">St Maarten</option>
                                <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                <option value="Saipan">Saipan</option>
                                <option value="Samoa">Samoa</option>
                                <option value="Samoa American">Samoa American</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option>
                                <option value="Tahiti">Tahiti</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Erimates">United Arab Emirates</option>
                                <option value="United States of America">United States of America</option>
                                <option value="Uraguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Vatican City State">Vatican City State</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                <option value="Wake Island">Wake Island</option>
                                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zaire">Zaire</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCohorts">
                            <Form.Label>Cohort</Form.Label>
                            <Form.Text style={{ marginTop: "-6px", marginBottom: "10px" }} muted>Please select the cohort that you are most interested in.<br />For more information about cohorts, see <a href="https://impactwithoutcontact.ca">here</a>.<br />You can change this later.</Form.Text>
                            <Form.Control required as="select" value={cohort} onChange={event => setCohort(event.target.value)}>
                                <option value="Select">Select</option>
                                <option value="Care Centers">Care Centers</option>
                                <option value="Public Health">Public Health</option>
                                <option value="Fundraising">Fundraising</option>
                                <option value="Lifestyle">Lifestyle</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formLanguages">
                            <Form.Label>Languages</Form.Label>
                            <Form.Text style={{ marginTop: "-6px", marginBottom: "10px" }} muted>What languages do you speak?<br />Please select all that apply. <OverlayTrigger placement="right" delay={{ show: 50, hide: 150 }} overlay={renderTooltip}><strong>Help?</strong></OverlayTrigger></Form.Text>
                            <Form.Control required as="select" multiple value={languages} onChange={event => {
                                const options = event.target.options;
                                let value = [];
                                for (let i = 0, l = options.length; i < l; i++) {
                                    if (options[i].selected) {
                                        value.push(options[i].value);
                                    }
                                }
                                setLanguages(value);
                            }}>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Bengali">Bengali</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Russian">Russian</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Afrikaans">Afrikaans</option>
                                <option value="Albanian">Albanian</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Armenian">Armenian</option>
                                <option value="Basque">Basque</option>
                                <option value="Bulgarian">Bulgarian</option>
                                <option value="Catalan">Catalan</option>
                                <option value="Cambodian">Cambodian</option>
                                <option value="Croatian">Croatian</option>
                                <option value="Czech">Czech</option>
                                <option value="Danish">Danish</option>
                                <option value="Dutch">Dutch</option>
                                <option value="Estonian">Estonian</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finnish">Finnish</option>
                                <option value="Georgian">Georgian</option>
                                <option value="German">German</option>
                                <option value="Greek">Greek</option>
                                <option value="Gujarati">Gujarati</option>
                                <option value="Hebrew">Hebrew</option>
                                <option value="Hungarian">Hungarian</option>
                                <option value="Icelandic">Icelandic</option>
                                <option value="Indonesian">Indonesian</option>
                                <option value="Irish">Irish</option>
                                <option value="Italian">Italian</option>
                                <option value="Javanese">Javanese</option>
                                <option value="Korean">Korean</option>
                                <option value="Latin">Latin</option>
                                <option value="Latvian">Latvian</option>
                                <option value="Lithuanian">Lithuanian</option>
                                <option value="Macedonian">Macedonian</option>
                                <option value="Malay">Malay</option>
                                <option value="Malayalam">Malayalam</option>
                                <option value="Maltese">Maltese</option>
                                <option value="Maori">Maori</option>
                                <option value="Marathi">Marathi</option>
                                <option value="Mongolian">Mongolian</option>
                                <option value="Nepali">Nepali</option>
                                <option value="Norwegian">Norwegian</option>
                                <option value="Persian">Persian</option>
                                <option value="Polish">Polish</option>
                                <option value="Punjabi">Punjabi</option>
                                <option value="Quechua">Quechua</option>
                                <option value="Romanian">Romanian</option>
                                <option value="Samoan">Samoan</option>
                                <option value="Serbian">Serbian</option>
                                <option value="Slovak">Slovak</option>
                                <option value="Slovenian">Slovenian</option>
                                <option value="Swahili">Swahili</option>
                                <option value="Swedish ">Swedish </option>
                                <option value="Tamil">Tamil</option>
                                <option value="Tatar">Tatar</option>
                                <option value="Telugu">Telugu</option>
                                <option value="Thai">Thai</option>
                                <option value="Tibetan">Tibetan</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Turkish">Turkish</option>
                                <option value="Ukrainian">Ukrainian</option>
                                <option value="Urdu">Urdu</option>
                                <option value="Uzbek">Uzbek</option>
                                <option value="Vietnamese">Vietnamese</option>
                                <option value="Welsh">Welsh</option>
                                <option value="Xhosa">Xhosa</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formSkills">
                            <Form.Label>Skills</Form.Label>
                            <Form.Text style={{ marginTop: "-6px", marginBottom: "10px" }} muted>What opportunities are you most suited for?<br />Please select all that apply. <OverlayTrigger placement="right" delay={{ show: 50, hide: 150 }} overlay={renderTooltip}><strong>Help?</strong></OverlayTrigger></Form.Text>
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
                            <Form.Text style={{ marginTop: "-6px", marginBottom: "10px" }} muted>If you were to write for our blog, what would you write about?<br />Please select all that apply.  <OverlayTrigger placement="right" delay={{ show: 50, hide: 150 }} overlay={renderTooltip}><strong>Help?</strong></OverlayTrigger></Form.Text>
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
                            <Form.Text style={{ marginTop: "-6px", marginBottom: "10px" }} muted>Please enter a short bio. (max 150 characters)</Form.Text>
                            <Form.Control required as="textarea" rows="3" value={bio} maxLength={150} onChange={event => setBio(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formHeard">
                            <Form.Label>How did you hear about us?</Form.Label>
                            <Form.Control required type="text" placeholder="How did you hear about us?" value={heard} maxLength={100} onChange={event => setHeard(event.target.value)} />
                        </Form.Group>
                        <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} type="submit" disabled={cohort === 'Select' || country === "Select" || city === "" || skills === [] || hobbies === [] || name === "" || bio === "" || heard === ""}>
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