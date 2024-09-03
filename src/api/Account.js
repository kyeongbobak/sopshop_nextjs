import { apiPost } from "../lib/api/utils";

export const validateAccount = (userId, token) => apiPost(`/accounts/signup/valid/username/`, userId, token);

export const validateCompanyNumber = (body) => apiPost(`/accounts/signup/valid/company_registration_number/`, body);
