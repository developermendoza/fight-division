import * as api from "../api";
import { FETCH_MATCHES_BY_EVENT_ID } from "../constants/actionTypes";

export const getMatchesByEventId = (id) => async (dispatch) => {
  try {
    const {data} = await api.fetchMatchesByEventId(id);
    dispatch({type:FETCH_MATCHES_BY_EVENT_ID, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}