import axios from "./axios";

const API = "http://localhost:3001/api";

export const registerRequest = (data) => axios.post(`/register`, data);
export const loginRequest = (data) => axios.post(`/login`, data);
export const verifyTokenRequest = (data) => axios.post(`/verify`, data);
