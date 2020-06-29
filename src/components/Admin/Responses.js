import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';

function Responses() {

    const [heard, setHeard] = useState([]);

    useEffect(() => {
        db.collection("users").get().then(querySnapshot => {
            let hears = [];
            querySnapshot.forEach(user => {
                if(user.data().quizCompleted && user.data().heard !== "Admin") {
                    hears.push(user.data().heard);
                }
            });
            hears.sort();
            setHeard(hears);
        })
    }, [])

    return (
        <div>
            <ul>
                {heard.length > 0 && heard.map(hear => <li>{hear}</li>)}
            </ul>
        </div>
    )
}

export default Responses;