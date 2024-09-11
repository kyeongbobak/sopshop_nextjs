import { useEffect, useState } from "react";
import { getProductDetail } from "../api/Product";

const useProductInfos = (token, productIds) => {
  const [productInfos, setProductInfos] = useState([]);

  const getProductInfos = async () => {
    const promises = productIds.map((productId) => getProductDetail(productId));
    const result = await Promise.all(promises);
    setProductInfos(result);
  };

  useEffect(() => {
    getProductInfos();
  }, [token, productIds]);
  return { productInfos };
};

export default useProductInfos;
