import React, { useContext } from 'react';
import app from './Firebase';
import UserContext from './Providers/UserProvider';

function Signout() {
    app.auth().signOut().then(() => {window.location.replace("/")}).catch(error => console.log(error));
    
    return(
        <>
        </>
    )
}

export default Signout;