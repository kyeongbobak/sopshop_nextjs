import { Instance } from "../lib/Instance/Instance";

export const getProducts = async () => {
  try {
    const res = await Instance.get(`api/v1/products/`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
