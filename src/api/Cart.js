import { apiGet, apiPost } from "../lib/api/utils";

// 카트 불러오기
export const getCartList = (token) => apiGet(`/api/v1/cart`, token);

// 장바구니에 상품 담기
export const addToCart = (body, token) => apiPost(`/api/v1/cart`, body, token);
