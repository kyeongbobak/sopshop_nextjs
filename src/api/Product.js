import { Instance } from "../lib/Instance/Instance";

// 전체 상품 리스트 불러오기
export const getProducts = async () => {
  try {
    const res = await Instance.get(`api/v1/products/`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
