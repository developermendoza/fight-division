import * as api from "../api";
import { FETCH_ALL_FIGHTERS, ADD_FIGHTER, UPDATE_FIGHTER } from "../constants/actionTypes";

export const getFighters = () => async (dispatch) => {
  try {
    const {data} = await api.fetchFighters();
    dispatch({type:FETCH_ALL_FIGHTERS, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const addFighter = (fighter) => async (dispatch) => {
  try {
    const {data} = await api.createFighter(fighter);
    dispatch({type:ADD_FIGHTER, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const editFighter = (updateFighter) => async (dispatch) => {
  console.log("editfighter: ",updateFighter)
  try {
    const {data} = await api.patchFighter(updateFighter)
    dispatch({type:UPDATE_FIGHTER, payload:data});

  } catch (error) {
    console.log(error.message)
  }
}