import { FETCH_OUTCOME_METHODS } from "../constants/actionTypes";

const matchOutcomeMethodsReducer = (state={data:null}, action ) => {
  switch (action.type) {
    case FETCH_OUTCOME_METHODS:
      return {
        ...state,
        data: action?.payload
      }
    default:
      return state;
  }
}
export default matchOutcomeMethodsReducer;