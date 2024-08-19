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

// 상품 디테일
export const getProductDetail = async (productId) => {
  try {
    const res = await Instance.get(`/api/v1/products/${productId}/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 상품 검색하기
export const search = async (searchKeyword) => {
  try {
    const res = await Instance.get(`/api/v1/products/?search=${searchKeyword}`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
