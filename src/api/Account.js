import { apiPost } from "../lib/api/utils";

export const signUp = (body) => apiPost(`api/v1/accounts/signup/`, body);

export const validateAccount = (userId, token) => apiPost(`api/v1/accounts/signup/valid/username/`, userId, token);

export const validateCompanyNumber = (body) => apiPost(`api/v1/accounts/signup/valid/company_registration_number/`, body);
