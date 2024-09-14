import { apiPost } from "../lib/api/commonApi";

export const order = (body, token) => apiPost(`/api/v1/order`, body, token);
