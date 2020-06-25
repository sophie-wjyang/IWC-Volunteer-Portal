import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import app from "../Firebase";
import Loading from '../Loading';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
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
  }

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!user ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};


export default PrivateRoute