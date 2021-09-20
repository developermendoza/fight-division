import * as api from "../api";
import { FETCH_ALL,FETCH_UPCOMING_EVENT } from "../constants/actionTypes";

export const getEvents = () => async (dispatch) => {
  try {
    const {data} = await api.fetchEvents();
    dispatch({type:FETCH_ALL, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const getUpcomingEvent = () => async (dispatch) => {
  try {
    const {data} = await api.fetchUpcomingEvent();
    dispatch({type:FETCH_UPCOMING_EVENT, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}