import { apiGet } from "../lib/api/commonApi";

// 전체 상품 리스트 불러오기
export const getProducts = () => apiGet(`api/v1/products/`);

// 상품 검색하기
export const search = (searchKeyword) => apiGet(`/api/v1/products/?search=${searchKeyword}`);

// 상품 디테일
export const getProductDetail = (productId) => apiGet(`/api/v1/products/${productId}/`);
