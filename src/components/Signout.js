import React from 'react';
import app from './Firebase';
import { Redirect } from 'react-router-dom'

function Signout() {
    app.auth().signOut().catch(error => alert(error));
    
    return(
        <Redirect to="/" />
    )
}

export default Signout;