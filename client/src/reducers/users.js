import { FETCH_TOPTEN_USERS } from "../constants/actionTypes";

const usersReducer = (state={data:null}, action ) => {
  switch (action.type) {
    case FETCH_TOPTEN_USERS:
      return {
        ...state,
        data: action?.payload
      }
    default:
      return state;
  }
}
export default usersReducer;