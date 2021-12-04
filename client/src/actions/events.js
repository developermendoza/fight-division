import * as api from "../api";
import { FETCH_UPCOMING_EVENT, 
  FETCH_UPCOMING_EVENT_SUCCESS, 
  FETCH_UPCOMING_EVENT_ERROR,
  ADD_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_UPCOMING_EVENTS,
  FETCH_UPCOMING_EVENTS_SUCCESS,
  FETCH_UPCOMING_EVENTS_ERROR,
  FETCH_UPCOMING_MAIN_EVENTS,
  FETCH_UPCOMING_MAIN_EVENTS_SUCCESS,
  FETCH_UPCOMING_MAIN_EVENTS_ERROR,
  FETCH_EVENTS_ERROR } from "../constants/actionTypes";

export const getEvents = () => async (dispatch) => {
  // const refreshing = true
  dispatch({type:FETCH_EVENTS});
  try {
      const {data} = await api.fetchEvents();
      dispatch({type:FETCH_EVENTS_SUCCESS, payload:data});
  } catch (error) {
    dispatch({type:FETCH_EVENTS_ERROR, payload:error});
  }
}


export const getUpcomingEvent = () => async (dispatch) => {
  
  dispatch({type:FETCH_UPCOMING_EVENT});
  try {
    const {data} = await api.fetchUpcomingEvent();
    dispatch({type:FETCH_UPCOMING_EVENT_SUCCESS, payload:data});
  } catch (error) {
    dispatch({type:FETCH_UPCOMING_EVENT_ERROR, payload:error});
  }
}

export const getUpcomingEvents = () => async (dispatch) => {
  
  dispatch({type:FETCH_UPCOMING_EVENTS});
  try {
    const {data} = await api.fetchUpcomingEvents();
    dispatch({type:FETCH_UPCOMING_EVENTS_SUCCESS, payload:data});
  } catch (error) {
    dispatch({type:FETCH_UPCOMING_EVENTS_ERROR, payload:error});
  }
}

export const getUpcomingMainEvents = () => async (dispatch) => {
  
  dispatch({type:FETCH_UPCOMING_MAIN_EVENTS});
  try {
    const {data} = await api.fetchUpcomingMainEvents();
    dispatch({type:FETCH_UPCOMING_MAIN_EVENTS_SUCCESS, payload:data});
  } catch (error) {
    dispatch({type:FETCH_UPCOMING_MAIN_EVENTS_ERROR, payload:error});
  }
}

export const addEvent = (event) => async (dispatch) => {
  try {
    const {data} = await api.createEvent(event);
    dispatch({type:ADD_EVENT, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteEvent = (id) => async (dispatch) => {
  try {
    const {data} = await api.removeEvent(id);
    dispatch({type:DELETE_EVENT, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateEvent = (event) => async (dispatch) => {

  try{
    const {data} = await api.patchEvent(event)
    dispatch({type:UPDATE_EVENT, payload:data})
  } catch (error) {
    console.log(error.message)
  }
}