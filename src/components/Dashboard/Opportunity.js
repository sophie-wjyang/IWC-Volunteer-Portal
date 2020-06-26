import React from 'react';
import { Card } from 'react-bootstrap';

function Opportunity(props) {
    return(
        <Card className="dashboard-opportunity-card">
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Opportunity;