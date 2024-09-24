import { apiGet, apiPut } from "../lib/api/commonApi";

export const sellerGetProductList = (token) => apiGet(`/api/v1/seller`, token);

export const sellerModifyProduct = (token, formData, productId, isFormData = true) => apiPut(`/api/v1/products/${productId}`, formData, token, isFormData);
