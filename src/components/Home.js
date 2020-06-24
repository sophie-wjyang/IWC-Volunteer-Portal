import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { auth } from './Firebase';

function Home() {
    console.log("hi");
    console.log(auth.currentUser);
    return (
        <>
            <Jumbotron>
                <h1>Welcome to the IWC Volunteer Site!</h1>
                <p>
                    Please log in or sign up to view opportunities.
                </p>
                <p>
                    <Button href="https://impactwithoutcontact.ca" variant="primary">Go to IWC Home</Button>
                </p>
            </Jumbotron>
        </>
    );
}

export default Home;