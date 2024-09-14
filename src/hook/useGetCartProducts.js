import { useEffect, useState } from "react";
import { getCartList } from "../api/Cart";

const useGetCartProducts = (token) => {
  const [cartList, setCartList] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [cartListCount, setCartListCount] = useState([]);

  const getShoppingCartList = async () => {
    const res = await getCartList(token);
    setCartList(res.results);
    const productId = res.results.map((item) => item.product_id);
    const cartListQuantity = res.results.map((list) => list.quantity);
    setProductIds(productId);
    setCartListCount(cartListQuantity);
  };

  useEffect(() => {
    getShoppingCartList();
  }, [token]);

  return { cartList, getShoppingCartList, productIds, cartListCount };
};

export default useGetCartProducts;
