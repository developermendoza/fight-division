import { ADMIN_AUTH, ADMIN_ERROR} from "../constants/actionTypes";
import { adminAuthenticated } from "../utils";

const adminAuthReducer = (state={adminAuthData: null}, action ) => {
  switch (action.type) {
    case ADMIN_AUTH:
      adminAuthenticated(action)
      return {
        ...state,
        adminAuthData: action?.payload
      }
    case ADMIN_ERROR:
        return {
          ...state, 
          authErrorLogin: action?.payload?.error, 
          adminAuthData: null
        }

    default:
      return state;
  }
}
export default adminAuthReducer;