import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })
const APIADMIN = axios.create({ baseURL: "http://localhost:5000/admin" })

export const registerUser = (newUser) => API.post(`/users/register`, newUser);
export const loginUser = (user) => API.post(`/users/login`, user);

// export const fetchEvents = () => API.get(`/events`);
export const fetchUpcomingEvent = () => API.get(`/events/getUpcomingEvent`);
export const fetchUpcomingEvents = () => API.get(`/events/upcomingEvents`);
export const fetchMatchesByEventId = (id) => API.get(`/matches/getMatchesByEventId/${id}`);
export const fetchMatchOutcomeMethods = () => API.get(`/matchOutcomeMethods`);
export const fetchTopTenUsers = () => API.get(`/users/topten`);
export const fetchUpcomingMainEventMatches = () => API.get("matches/upcomingMainEventMatches")
export const fetchUpcomingMainEvents = () => API.get("events/upcomingMainEvents");


// admin
export const fetchUsers = () => APIADMIN.get("/users");
export const deleteUser = (id) => APIADMIN.delete(`/users/${id}`);
export const patchUser = (user) => APIADMIN.patch(`/users/`, user);
export const addUser = (user) => APIADMIN.post(`/users/`, user)
export const loginAdminUser = (user) => APIADMIN.post(`/`, user);



export const fetchFighters = () => APIADMIN.get("/fighters")
export const createFighter = (fighter) => APIADMIN.post("/fighters", fighter)
export const patchFighter = (updateFighter) => APIADMIN.patch("/fighters", updateFighter)

export const fetchNetworks = () => APIADMIN.get("/networks")

export const fetchOrganizations = () => APIADMIN.get("/organizations")

export const createEvent = (event) => APIADMIN.post("/events", event)
export const removeEvent = (id) => APIADMIN.delete(`/events/${id}`);
export const patchEvent = (event) => APIADMIN.patch(`/events`, event);
export const fetchEvents = () => APIADMIN.get(`/events`);

export const fetchMatches = () =>APIADMIN.get("/matches");
export const removeMatch = (id) => APIADMIN.delete(`/matches/${id}`);
export const createMatch = (match) => APIADMIN.post(`/matches`, match)
export const patchMatch = (match) => APIADMIN.patch(`/matches`, match);


export const fetchWeights = () =>APIADMIN.get("/weights");

export const createPicks = (picks) => APIADMIN.post("/picks", picks)
