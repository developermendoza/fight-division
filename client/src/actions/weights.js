import * as api from "../api";
import { FETCH_WEIGHTS } from "../constants/actionTypes";

export const getWeights = () => async (dispatch) => {
  try {
    const {data} = await api.fetchWeights();
    dispatch({type:FETCH_WEIGHTS, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}