import * as api from "../api";
import { FETCH_OUTCOME_METHODS } from "../constants/actionTypes";

export const getMatchOutcomeMethods = (id) => async (dispatch) => {
  try {
    const {data} = await api.fetchMatchOutcomeMethods();
    dispatch({type:FETCH_OUTCOME_METHODS, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}