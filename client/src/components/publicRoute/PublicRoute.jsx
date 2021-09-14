
import { Route, Redirect } from 'react-router-dom';
import { userAuthenticated } from '../../utils';

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            userAuthenticated() && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};


export default PublicRoute;