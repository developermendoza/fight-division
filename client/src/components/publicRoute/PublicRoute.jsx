
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from "react";
import { userAuthenticated } from '../../utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
  // const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("authorized")));
  // const isAuthorized = localStorage.getItem("authorized") ? true : false

// useEffect(() => {
//   setUser(JSON.parse(localStorage.getItem("authorized")))
// }, []);

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            userAuthenticated() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};


export default PublicRoute;