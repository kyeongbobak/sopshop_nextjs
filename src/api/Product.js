import { apiGet } from "../lib/api/commonApi";

// 상품 전체 목록 보기
export const getProducts = () => apiGet(`/api/v1/products/`);

// 상품 검색하기
export const search = (searchKeyword) => apiGet(`/api/v1/products/?search=${searchKeyword}`);

// 상품 디테일
export const getProductDetail = (productId) => apiGet(`/api/v1/products/${productId}/`);
