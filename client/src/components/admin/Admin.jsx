
import { Admin as ReactAdmin, Resource } from 'react-admin';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import createAdminStore from '../../createAdminStore';
import UserList from "./users/UserList";
import UserCreate from "./users/UserCreate";
import dataProvider from './DataProvider';


const history = createHashHistory();
const authProvider = () => Promise.resolve();

function Admin() {
  return (
    <Provider
        store={createAdminStore({
            authProvider,
            dataProvider,
            history,
        })}
    >
        <ReactAdmin
            authProvider={authProvider}
            dataProvider={dataProvider}
            history={history}
            title="My Admin"
        >
            <Resource name="users" list={UserList} create={UserCreate}/> 
        </ReactAdmin>
    </Provider>
  )
}

export default Admin;
