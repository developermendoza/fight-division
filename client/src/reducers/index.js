import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import events from "./events";
import matches from "./matches";

export default combineReducers({
  auth,
  users,
  events,
  matches,
})