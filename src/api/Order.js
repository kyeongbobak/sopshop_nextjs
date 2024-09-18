import { apiPost, apiGet } from "../lib/api/commonApi";

export const order = (body, token) => apiPost(`/api/v1/order`, body, token);

export const orderList = (token) => apiGet(`/api/v1/order`, token);
