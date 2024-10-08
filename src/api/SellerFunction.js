import { apiGet, apiPut, apiPost, apiDelete } from "../lib/api/commonApi";

// 판매자 전체 상품 목록 보기
export const sellerGetProductList = (token) => apiGet(`/api/v1/seller`, token);

// 상품 수정하기
export const sellerModifyProduct = (token, formData, productId, isFormData = true) => apiPut(`/api/v1/products/${productId}`, formData, token, isFormData);

// 상품 등록하기
export const sellerMakeProduct = (token, formData, isFormData = true) => apiPost(`/api/v1/products`, formData, token, isFormData);

// 상품 삭제하기
export const sellerDeleteProduct = (token, productId) => apiDelete(`/api/v1/products/${productId}`, token);
