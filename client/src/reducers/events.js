import { FETCH_ALL, FETCH_UPCOMING_EVENT } from "../constants/actionTypes";

const eventsReducer = (state={data:null}, action ) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        data: action?.payload
      }
    case FETCH_UPCOMING_EVENT:
        return {
          ...state,
          data:action?.payload
        }
    default:
      return state;
  }
}
export default eventsReducer;