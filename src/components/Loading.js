import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <div style={{ width: "100%", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Spinner animation="border" role="status" variant="primary">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading;