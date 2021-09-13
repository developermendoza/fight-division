import { AUTH, ERROR, CLEAR_ERRORS } from "../constants/actionTypes";
import { authenticated } from "../utils";

const authReducer = (state={authData: null}, action ) => {
  switch (action.type) {
    case AUTH:
      authenticated(action)
      return {
        ...state,
        authData: action?.payload
      }
      case ERROR:
        if(action.payload.form === "login"){
          return {...state, errorLogin: action.payload, authData: null}
        }
        return {...state, errorRegister: action.payload, authData: null}
      case CLEAR_ERRORS:
        return {...state, errorRegister: null, errorLogin: null, authData: null}
    default:
      return state;
  }
}
export default authReducer;