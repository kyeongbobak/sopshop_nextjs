import { apiPost } from "../lib/api/utils";

export const validateAccount = (userId, token) => apiPost(`/accounts/signup/valid/username/`, userId, token);
