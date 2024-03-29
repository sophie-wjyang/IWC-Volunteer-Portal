import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

function Home() {
    return (
        <>
            <Jumbotron>
                <h1>Welcome to the IWC Volunteer Site!</h1>
                <p>
                    Please log in or sign up to view opportunities.
                </p>
                <p>
                    Note: the site is currently under active development, please report any bugs to <a href="mailto:impactwithoutcontact@gmail.com" className="link">impactwithoutcontact@gmail.com</a>.
                </p>
                <p>To learn more about Impact Without Contact, visit the website <a href="https://impactwithoutcontact.ca" className="link">here</a>.</p>
                <Button variant="primary" style={{ backgroundColor: "#55BCC9", border: "#FC4445", margin: "10px" }} onClick={() => window.location.replace("/signup")}>Sign Up</Button>
                <Button variant="primary" style={{ backgroundColor: "#FC4445", border: "#FC4445", margin: "10px" }} onClick={() => window.location.replace("/login")}>Log In</Button>
            </Jumbotron>
        </>
    );
}

export default Home;