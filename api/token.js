import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};
export const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export const hasExpiredToken = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};
