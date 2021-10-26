
import * as api from "../api";
import { 
  ADD_PICKS,
  ADD_PICKS_SUCCESS,
  ADD_PICKS_ERROR

} from "../constants/actionTypes";
export const addPicks = (picks) => async (dispatch) => {
  dispatch({type:ADD_PICKS});
  try {
    const {data} = await api.createPicks(picks);
    dispatch({type:ADD_PICKS_SUCCESS, payload:data});
  } catch (error) {
    dispatch({type:ADD_PICKS_ERROR, payload:error.message});
  }
}