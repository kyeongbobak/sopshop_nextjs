import { Instance } from "./Instance";

const createHeaders = (token) => (token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);

export const apiGet = async (url, token) => {
  try {
    const config = createHeaders(token);
    const res = await Instance.get(url, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPost = async (url, body, token) => {
  console.log;
  try {
    const config = createHeaders(token);
    const res = await Instance.post(url, body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiDelete = async (url, token) => {
  try {
    const config = createHeaders(token);
    const res = await Instance.delete(url, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPut = async (url, body, token) => {
  try {
    const config = createHeaders(token);
    const res = await Instance.put(url, body, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
