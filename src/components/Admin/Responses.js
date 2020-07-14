import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';

function Responses() {

    const [heard, setHeard] = useState([]);
    const [users, setUsers] = useState([]);
    const [signups, setSignups] = useState(0);

    useEffect(() => {
        db.collection("users").get().then(querySnapshot => {
            let hears = [];
            let userList = [];
            let count = 0;
            querySnapshot.forEach(user => {
                if (user.data().quizCompleted && user.data().heard !== "Admin") {
                    hears.push(user.data().heard);
                    userList.push(user.data().email);
                    count++;
                }
            });
            hears.sort();
            setHeard(hears);
            setUsers(userList);
            setSignups(count);
        })
    }, [])

    return (
        <div>
            <h1>List of IWC Users</h1>
            <ul>
                {users.length > 0 && users.map(user => <li>{user}</li>)}
            </ul>
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