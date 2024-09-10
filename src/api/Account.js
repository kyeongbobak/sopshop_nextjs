import { apiPost } from "../lib/api/utils";

// 회원가입
export const signUp = (body) => apiPost(`api/v1/accounts/signup/`, body);

// 계정 검증
export const validateAccount = (userId, token) => apiPost(`api/v1/accounts/signup/valid/username/`, userId, token);

// 사업자 등록번호 검증
export const validateCompanyNumber = (body) => apiPost(`api/v1/accounts/signup/valid/company_registration_number/`, body);
