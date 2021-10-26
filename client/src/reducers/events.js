import { FETCH_ALL, 
  FETCH_UPCOMING_EVENT, 
  ADD_EVENT, 
  DELETE_EVENT, 
  UPDATE_EVENT,
  FETCH_EVENTS_IDLE,
  FETCH_EVENTS, 
  FETCH_EVENTS_SUCCESS, 
  FETCH_EVENTS_ERROR,
  FETCH_UPCOMING_EVENT_SUCCESS,
  FETCH_UPCOMING_EVENT_ERROR
} from "../constants/actionTypes";

const initialState = {
  data:null,
  error:null,
  fetchInProgress: false,
}
  const eventsReducer = (state=initialState, action ) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return{
        ...state,
        fetchInProgress: true,
        error: null,
      }
    case FETCH_EVENTS_SUCCESS:
      return{
        ...state,
        data: action?.payload,
        error:null,
        fetchInProgress: false,
      }
    case FETCH_EVENTS_ERROR:
      return {
        ...state,
        fetchInProgress: false,
        error: action?.payload,
      }
    case DELETE_EVENT:
      return {
        ...state,
        data: state.data.filter( event => event._id !== action?.payload._id)
      }
    case FETCH_UPCOMING_EVENT:
        return {
          ...state,
          fetchInProgress: true,
          error: null
        }
    case FETCH_UPCOMING_EVENT_SUCCESS: 
        return {
          ...state,
          data:action?.payload,
          error:null,
          fetchInProgress: false,
        }
    case FETCH_UPCOMING_EVENT_ERROR:
        return {
          ...state,
          fetchInProgress: false,
          error: action?.payload,
        }
    case ADD_EVENT:
        return {
          ...state,
          data:[...state.data, action?.payload]
        }
    case UPDATE_EVENT:
      return {
        ...state,
        data: state.data.map( event => event._id === action?.payload._id ? action?.payload : event)
      }
    default:
      return state;
  }
}
export default eventsReducer;