import * as api from "../api";
import { FETCH_MATCHES, 
  DELETE_MATCH, 
  ADD_MATCH, 
  UPDATE_MATCH, 
  FETCH_MATCHES_BY_EVENT_ID,
  FETCH_MATCHES_BY_EVENT_ID_SUCCESS,
  FETCH_MATCHES_BY_EVENT_ID_ERROR  } from "../constants/actionTypes";

export const getMatchesByEventId = (id) => async (dispatch) => {

  dispatch({type:FETCH_MATCHES_BY_EVENT_ID});
  try {
    const {data} = await api.fetchMatchesByEventId(id);
    dispatch({type:FETCH_MATCHES_BY_EVENT_ID_SUCCESS, payload:data});
  } catch (error) {
    dispatch({type:FETCH_MATCHES_BY_EVENT_ID_ERROR, payload:error});
    console.log(error.message)
  }
}

export const getMatches = () => async (dispatch) => {
  try {
    const {data} = await api.fetchMatches();
    // console.log("getMatches data: ", data)
    dispatch({type:FETCH_MATCHES, payload:data})
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteMatch = (id) => async (dispatch) => {
  try {
    // console.log("id: ", id)
    const {data} = await api.removeMatch(id);
    dispatch({type:DELETE_MATCH, payload:data})
  } catch (error) {
    console.log(error.message)
  }
}

export const addMatch = (match) => async (dipatch) => {
  try {
    const {data} =await api.createMatch(match)
    dipatch({type:ADD_MATCH, payload:data})
  } catch (error) {
    console.log(error.message)
  }
}

export const updateMatch = (match) => async (dipatch) => {
  try {
    const {data} =await api.patchMatch(match)
    dipatch({type:UPDATE_MATCH, payload:data})
  } catch (error) {
    console.log(error.message)
  }
}