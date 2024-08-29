import { Instance } from "./Instance";

export const apiGet = async (url) => {
  console.log(url);
  try {
    const res = await Instance.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const apiPost = async (url, body) => {
  try {
    const res = await Instance.post(url, body);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
