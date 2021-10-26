import { FETCH_ALL_FIGHTERS, ADD_FIGHTER, UPDATE_FIGHTER } from "../constants/actionTypes";

const fightersReducer = (state={data:null}, action ) => {
  switch (action.type) {
    case FETCH_ALL_FIGHTERS:
      return {
        ...state,
        data: action?.payload
      }
    case ADD_FIGHTER:
      return {
        ...state,
        data: [...state.data, action?.payload]
      }
    case UPDATE_FIGHTER:
      return{
        ...state,
        data: state.data.map( fighter => fighter._id === action?.payload._id ? action?.payload : fighter )
      }
    default:
      return state;
  }
}
export default fightersReducer;