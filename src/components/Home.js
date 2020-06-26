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
                    <Button style={{ backgroundColor: "#FC4445", border: "#FC4445" }} href="https://impactwithoutcontact.ca">Go to IWC Home</Button>
                </p>
            </Jumbotron>
        </>
    );
}

export default Home;