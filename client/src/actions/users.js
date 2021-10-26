import * as api from "../api";
import { FETCH_TOPTEN_USERS, FETCH_ALL, DELETE, UPDATE_USER, ADD_USER } from "../constants/actionTypes";

export const getUsers = () => async (dispatch) => {
  try {
    const {data} = await api.fetchUsers();
    dispatch({type:FETCH_ALL, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const removeUser = (id) => async (dispatch) => {

  // console.log("removeUser: ", id)
  try {
    const {data} = await api.deleteUser(id);
    dispatch({type:DELETE, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const getTopTenUsers = () => async (dispatch) => {
  try {
    const {data} = await api.fetchTopTenUsers();
    dispatch({type:FETCH_TOPTEN_USERS, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}

export const updateUser = (user) => async (dispatch) => {
    try {
      const {data} = await api.patchUser(user);
      dispatch({type:UPDATE_USER, payload:data})
    } catch (error) {
      console.log(error.message)
    }
}

export const createUser = (user) => async (dispatch) => {
  try {
    const {data} = await api.addUser(user);
    dispatch({type:ADD_USER, payload:data})
  } catch (error) {
    console.log(error.message)
  }
}