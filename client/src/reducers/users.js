import { FETCH_ALL, FETCH_TOPTEN_USERS, DELETE, UPDATE_USER, ADD_USER } from "../constants/actionTypes";

const usersReducer = (state={data:null}, action ) => {

 
  switch (action.type) {
    case FETCH_TOPTEN_USERS:
      return {
        ...state,
        data: action?.payload
      }
    case DELETE:{
      return {
        ...state,
        data: state.data.filter( user => user._id !== action.payload._id)
      }
    }
    case UPDATE_USER:{
      return {
        ...state,
        data: state.data.map( user => user._id === action?.payload._id ? action.payload : user)
      }
    }
    case FETCH_ALL:
      return {
        ...state,
        data: action?.payload
      }
      case ADD_USER:{
        return {
          ...state,
          data : [ ...state.data, action?.payload]
        }
      }
    default:
      return state;
  }
}
export default usersReducer;