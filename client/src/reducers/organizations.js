import { FETCH_ORGANIZATIONS } from "../constants/actionTypes";

const organizationsReducer = (state={data:null}, action ) => {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return {
        ...state,
        data: action?.payload
      }
    default:
      return state;
  }
}
export default organizationsReducer;