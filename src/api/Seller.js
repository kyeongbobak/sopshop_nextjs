import { apiGet } from "../lib/api/commonApi";

export const sellerGetProductList = (token) => apiGet(`/api/v1/seller`, token);
