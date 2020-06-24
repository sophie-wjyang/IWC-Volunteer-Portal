import React from 'react';

import { db, getCurrentUser } from './Firebase';

function Setup() {

    //if (db.collection("users").doc())

    return(
        <>
            {getCurrentUser()}
        </>
    )
}

export default Setup;