import { apiDelete, apiGet, apiPost, apiPut } from "../lib/api/commonApi";

// 카트 불러오기
export const getCartList = (token) => apiGet(`/api/v1/cart`, token);

// 장바구니에 상품 담기
export const addToCart = (body, token) => apiPost(`/api/v1/cart`, body, token);

// 장바구니 전체 삭제하기
export const deleteAllCartItem = (token) => apiDelete(`/api/v1/cart`, token);

// 장바구니 개별 삭제하기
export const deleteCartItem = (itemId, token) => apiDelete(`/api/v1/cart/${itemId}`, token);

// 장바구니 수량 수정하기
export const modifyCartCount = (itemId, body, token) => apiPut(`/api/v1/cart/${itemId}`, body, token);
