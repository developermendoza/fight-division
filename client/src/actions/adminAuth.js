import * as api from "../api";
import { ADMIN_AUTH, ADMIN_ERROR  } from "../constants/actionTypes";

export const adminLogin = (user, history) => async (dispatch) => {
  console.log("user: ", user)
  console.log("history: ", history)
  try {
    const { data } = await api.loginAdminUser(user);
    console.log("data: ", data)
    dispatch({type:ADMIN_AUTH , payload:data})
    history.push("/admin")
  } catch (error) {
    console.log("error: ", error.response)
    dispatch({type:ADMIN_ERROR , payload: {error: error.response.data.error}})
  }
}