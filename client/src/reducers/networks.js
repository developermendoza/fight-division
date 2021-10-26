import { FETCH_NETWORKS } from "../constants/actionTypes";

const networksReducer = (state={data:null}, action ) => {

  switch (action.type) {
    case FETCH_NETWORKS:
      return {
        ...state,
        data:action?.payload
      }
    default:
      return state;
  }
}
export default networksReducer;