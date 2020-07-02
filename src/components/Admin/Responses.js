import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';

function Responses() {

    const [heard, setHeard] = useState([]);
    const [signups, setSignups] = useState(0);

    useEffect(() => {
        db.collection("users").get().then(querySnapshot => {
            let hears = [];
            let count = 0;
            querySnapshot.forEach(user => {
                if (user.data().quizCompleted && user.data().heard !== "Admin") {
                    hears.push(user.data().heard);
                    count++;
                }
            });
            hears.sort();
            setHeard(hears);
            setSignups(count);
        })
    }, [])

    return (
        <div>
            <h1>Responses for "How did you hear about IWC?"</h1>
            <ul>
                {heard.length > 0 && heard.map(hear => <li>{hear}</li>)}
            </ul>
            <h1>Number of signups: </h1>
            <p>{signups}</p>
        </div>
    )
}

export default Responses;