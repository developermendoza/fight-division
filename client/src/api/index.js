import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

export const registerUser = (newUser) => API.post(`/user/register`, newUser);
export const loginUser = (user) => API.post(`/user/login`, user);
export const fetchEvents = () => API.get(`/events`);
export const fetchUpcomingEvent = () => API.get(`/events/getUpcomingEvent`);
export const fetchMatchesByEventId = (id) => API.get(`/matches/getMatchesByEventId/${id}`);