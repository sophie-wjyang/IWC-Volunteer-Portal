import React, { useEffect, useState } from 'react';
import app, { db } from './Firebase'
import Loading from './Loading';

function Dashboard() {

    const [user, setUser] = useState(null);
    const [pending, setPending] = useState(true);

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
            if (!doc.data().quizCompleted) {
                window.location.replace("/setup");
            }
        })
    }

    return (
        <>
            Dashboard
        </>
    )
}

export default Dashboard;