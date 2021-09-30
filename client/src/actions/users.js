import * as api from "../api";
import { FETCH_TOPTEN_USERS } from "../constants/actionTypes";

// export const getUsers = () => async (dispatch) => {
//   try {
//     const {data} = await api.fetchUsers();
//     dispatch({type:FETCH_ALL, payload:data});
//   } catch (error) {
//     console.log(error.message)
//   }
// }

export const getTopTenUsers = () => async (dispatch) => {
  try {
    const {data} = await api.fetchTopTenUsers();
    dispatch({type:FETCH_TOPTEN_USERS, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}