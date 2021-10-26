import { combineReducers } from "redux";
import auth from "./auth";
import users from "./users";
import events from "./events";
import matches from "./matches";
import fighters from "./fighters";
import matchOutcomeMethods from "./matchOutcomeMethods";
import networks from "./networks";
import organizations from "./organizations";
import weights from "./weights";
import loader from "./uiReducer";
import picks from "./picks";

export default combineReducers({
  auth,
  users,
  events,
  matches,
  matchOutcomeMethods,
  fighters,
  networks,
  organizations,
  weights,
  loader,
  picks
})