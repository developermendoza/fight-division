import * as api from "../api";
import { FETCH_ORGANIZATIONS } from "../constants/actionTypes";

export const getOrganizations = () => async (dispatch) => {
  try {
    const {data} = await api.fetchOrganizations();
    dispatch({type:FETCH_ORGANIZATIONS, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}