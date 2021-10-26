import * as api from "../api";
import { FETCH_NETWORKS } from "../constants/actionTypes";

export const getNetworks= () => async (dispatch) => {
  try {
    const {data} = await api.fetchNetworks();
    dispatch({type:FETCH_NETWORKS, payload:data});
  } catch (error) {
    console.log(error.message)
  }
}
