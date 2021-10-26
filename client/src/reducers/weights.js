import { FETCH_WEIGHTS } from "../constants/actionTypes";

const weightsReducer = (state={data:null}, action ) => {
  switch (action.type) {
    case FETCH_WEIGHTS:
      return {
        ...state,
        data: action?.payload
      }
    default:
      return state;
  }
}
export default weightsReducer;