import { FETCH_MAIN_EVENT_MATCH, FETCH_MATCHES_BY_EVENT_ID } from "../constants/actionTypes";

const matchesReducer = (state={data:null}, action ) => {
  switch (action.type) {
    case FETCH_MAIN_EVENT_MATCH:
      return {
        ...state,
        data: action?.payload
      }
    case FETCH_MATCHES_BY_EVENT_ID:
      return{
        ...state,
        data: action?.payload
      }
    default:
      return state;
  }
}
export default matchesReducer;