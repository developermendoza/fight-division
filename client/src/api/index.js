import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

export const registerUser = (newUser) => API.post(`/users/register`, newUser);
export const loginUser = (user) => API.post(`/users/login`, user);
export const fetchEvents = () => API.get(`/events`);
export const fetchUpcomingEvent = () => API.get(`/events/getUpcomingEvent`);
export const fetchMatchesByEventId = (id) => API.get(`/matches/getMatchesByEventId/${id}`);
export const fetchMatchOutcomeMethods = () => API.get(`/matchOutcomeMethods`);
export const fetchTopTenUsers = () => API.get(`/users/topten`)
