import { apiPost } from "../lib/api/utils";

export const userLogin = (body) => apiPost(`/api/v1/accounts/login`, body);

export const userLogout = (token) => apiPost(`/api/v1/accounts/logout`, null, token);
