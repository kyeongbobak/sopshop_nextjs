import { Instance } from "./Instance";

export const apiGet = async (url, token) => {
  try {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined;
    const res = await Instance.get(url, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPost = async (url, body, token) => {
  try {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined;
    const res = await Instance.post(url, body, config);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
