import * as api from "../api";
import { AUTH, ERROR  } from "../constants/actionTypes";

export const login = (user, history, form) => async (dispatch) => {

  try {
    const { data } = await api.loginUser(user);
    dispatch({type:AUTH , payload:data})
    history.push("/dashboard")
  } catch (error) {
    dispatch({type:ERROR , payload: {...error.response.data, form}})
  }
}

export const register = (user, history, form) => async (dispatch) => {
  try {
    const {data} = await api.registerUser(user);
    dispatch({type:AUTH , payload:data})
    history.push("/dashboard")
  } catch (error) {
    dispatch({type:ERROR , payload: {...error.response.data, form}})
  }
}