import { FETCH_MAIN_EVENT_MATCH, 
  FETCH_MATCHES, DELETE_MATCH, 
  ADD_MATCH, UPDATE_MATCH,
  FETCH_MATCHES_BY_EVENT_ID,
  FETCH_MATCHES_BY_EVENT_ID_SUCCESS,
  FETCH_MATCHES_BY_EVENT_ID_ERROR,
  FETCH_UPCOMING_MAIN_EVENT_MATCHES,
  FETCH_UPCOMING_MAIN_EVENT_MATCHES_SUCCESS,
  FETCH_UPCOMING_MAIN_EVENT_MATCHES_ERROR
} from "../constants/actionTypes";

const initialState = {
  data:null,
  error:null,
  fetchInProgress: false,
}

const matchesReducer = (state=initialState, action ) => {

  switch (action.type) {
    case FETCH_MATCHES:
      return {
        ...state,
        data:action?.payload,
        fetchInProgress: true,
      }
    case FETCH_UPCOMING_MAIN_EVENT_MATCHES:
      return {
        ...state,
        data:action?.payload,
        fetchInProgress: true,
      }
    case FETCH_UPCOMING_MAIN_EVENT_MATCHES_SUCCESS:
      return {
        ...state,
        data: action?.payload,
        error:null,
        fetchInProgress: false,
      }
    case FETCH_UPCOMING_MAIN_EVENT_MATCHES_ERROR:
      return {
        ...state,
        fetchInProgress: false,
        error: action?.payload
      }
    case ADD_MATCH:{
      return {
        ...state,
        data: [...state.data, action?.payload]
      }
    }

    case UPDATE_MATCH:{
      return {
        ...state,
        data: state.data.map( match => match._id === action.payload?._id ? action?.payload : match)
      }
    }

    case FETCH_MAIN_EVENT_MATCH:
      return {
        ...state,
        data: action?.payload,
        fetchInProgress: true,
      }

    case FETCH_MATCHES_BY_EVENT_ID:
      return{
        ...state,
        fetchInProgress: true,
        error: null
      }
    case FETCH_MATCHES_BY_EVENT_ID_SUCCESS:
      return {
        ...state,
        data: action?.payload,
        error:null,
        fetchInProgress: false,
      }
    case FETCH_MATCHES_BY_EVENT_ID_ERROR:
      return {
        ...state,
        fetchInProgress: false,
        error: action?.payload
      }

    // case FETCH_MATCHES_BY_EVENT_ID:
    //   return{
    //     ...state,
    //     data: action?.payload
    //   }

      case DELETE_MATCH:{
        return {
          ...state,
          data: state.data.filter( match => match._id !== action.payload._id)
        }
      }
    default:
      return state;
  }
}
export default matchesReducer;