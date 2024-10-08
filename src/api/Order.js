import { apiPost, apiGet } from "../lib/api/commonApi";

// 주문 생성하기
export const order = (body, token) => apiPost(`/api/v1/order`, body, token);

// 주문 목록 보기
export const orderList = (token) => apiGet(`/api/v1/order`, token);
