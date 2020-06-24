import React from 'react';
import { getCurrentUser, signOut } from './Firebase';

function Signout() {
    if (getCurrentUser()) {
        signOut();
        window.location.replace("/");
    } else {
        window.location.replace("/login");
    }
    
    return(
        <>
        </>
    )
}

export default Signout;