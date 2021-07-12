import React from "react";

// Libs
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      data-testid="privateRoute-component"
      {...rest}
      render={(props) =>
        localStorage.getItem("jwt") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
