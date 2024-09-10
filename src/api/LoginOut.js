import { apiPost } from "../lib/api/utils";

// 로그인
export const userLogin = (body) => apiPost(`/api/v1/accounts/login`, body);

// 로그아웃
export const userLogout = (token) => apiPost(`/api/v1/accounts/logout`, null, token);
