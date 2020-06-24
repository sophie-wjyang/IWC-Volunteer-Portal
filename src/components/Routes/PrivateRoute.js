import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
// import app from "../Firebase";
import { UserContext } from '../Providers/UserProvider';
import { app, getCurrentUser } from '../Firebase';

async function getUser() {
  let user = await getCurrentUser();
  return user;
}

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then(user => setUser(user)).catch(err => console.log(err));
  });

  return (
    <Route
      {...rest}
      render={routeProps =>
        user ? (
          <RouteComponent {...routeProps} />
        ) : (<></>
          /*<Redirect to="/login" />*/
        )
      }
    />
  );
};


export default PrivateRoute