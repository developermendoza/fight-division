import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

export const registerUser = (newUser) => API.post(`/user/register`, newUser);
export const loginUser = (user) => API.post(`/user/login`, user);