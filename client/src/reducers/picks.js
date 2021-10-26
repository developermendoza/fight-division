import {
  ADD_PICKS, 
  ADD_PICKS_SUCCESS,
  ADD_PICKS_ERROR
} from "../constants/actionTypes";

const initialState = {
  data:null,
  error:null,
  fetchInProgress: false,
}
  const eventsReducer = (state=initialState, action ) => {
  switch (action.type) {
    case ADD_PICKS:
      return{
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case ADD_PICKS_SUCCESS:
      return{
        ...state,
        data: action?.payload,
        fetchInProgress: false,
        error: null,
      }
      case ADD_PICKS_ERROR:
        return{
          ...state,
          fetchInProgress: false,
          error: action?.payload,
        }
    default:
      return state;
  }
}
export default eventsReducer;