import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

// const url = "http://localhost:5000/admin";

// export const fetchUsers = () => axios.get(`${url}/users`);
// export const fetchUsers = () => axios.get(url);
export const registerUser = (newUser) => API.post(`/user/register`, newUser);
export const loginUser = (user) => API.post(`/user/login`, user);