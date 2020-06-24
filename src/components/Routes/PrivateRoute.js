import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

let user = auth.currentUser;

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [user, loading, error] = useAuthState(auth);

    if(loading) {
        return (
            <></>
        )
    }

    if(error) {
        return (
            <>{error}</>
        )
    }

    if(user) {
        return (
            <Route {...rest} render={(props)=> {
                <Component {...props} />
            }} />
        )
    }

    return <Redirect to='/login' />

    
}

export default PrivateRoute;