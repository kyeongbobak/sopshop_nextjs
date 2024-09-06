import { apiGet, apiPost } from "../lib/api/utils";

export const getCartList = (token) => apiGet(`/api/v1/cart`, token);

export const addToCart = (body, token) => apiPost(`/api/v1/cart`, body, token);
