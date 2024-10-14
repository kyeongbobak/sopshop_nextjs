import { Instance } from "./Instance";

const createHeaders = (token, isFormData = false) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  if (isFormData) {
    return { headers: { ...headers, "Content-Type": "multipart/form-data" } };
  }
  return { headers };
};

export const apiGet = async (url, token) => {
  console.log(url);
  try {
    const config = createHeaders(token);
    const res = await Instance.get(url, config);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPost = async (url, body, token, isFormData = false) => {
  try {
    const config = createHeaders(token, isFormData);
    const res = await Instance.post(url, body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiDelete = async (url, token) => {
  console.log(token);
  try {
    const config = createHeaders(token);
    const res = await Instance.delete(url, config);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const apiPut = async (url, body, token, isFormData = false) => {
  try {
    const config = createHeaders(token, isFormData);
    const res = await Instance.put(url, body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
