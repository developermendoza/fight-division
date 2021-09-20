import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';
import { userAuthenticated } from '../../utils';

const PrivateRoute = ({component: Component , ...rest}) => {
    return (
      <Route
      {...rest}
      render={({ location }) => {
        return userAuthenticated()  ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    ></Route>

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        // <Route {...rest} render={props => (
        //     userAuthenticated() ?
        //         <Component {...props} />
        //     : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        // )} />
    );
};

export default PrivateRoute;