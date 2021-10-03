
import { Admin as ReactAdmin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
// import createAdminStore from "../../createAdminStore"
import createAdminStore from '../../createAdminStore';
import UserList from "./users/UserList";
import UserCreate from "./users/UserCreate";
import UserEdit from "./users/UserEdit";

import EventList from "./events/EventList";
import NetworkList from "./networks/NetworkList";
import dataProvider from './DataProvider';
import jsonapiClient from "ra-jsonapi-client";
import simpleRestProvider from 'ra-data-simple-rest';

// const dataProvider = DataProvider;


const history = createHashHistory();
const authProvider = () => Promise.resolve();

// console.log("UserList: ", UserList)

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
            {/* <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} show={PostShow} />
            <Resource name="comments" list={CommentList} edit={CommentEdit} create={CommentCreate} />*/}
            <Resource 
              name="users" 
              list={UserList} 
              // create={UserCreate} 
              // edit={UserEdit}
                
              /> 

            <Resource 
              name="events" 
              list={EventList}
              // list={ListGuesser}
            />

            <Resource 
              name="networks" 
              list={NetworkList}
            />
        </ReactAdmin>
    </Provider>
  )
}

export default Admin;
