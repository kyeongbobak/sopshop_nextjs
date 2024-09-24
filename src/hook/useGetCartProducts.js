import { useEffect, useState } from "react";
import { getCartList } from "../api/Cart";
import { userType } from "../recoil/atoms";
import { useRecoilValue } from "recoil";

const useGetCartProducts = (token) => {
  const [cartList, setCartList] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [cartListCount, setCartListCount] = useState([]);

  const userState = useRecoilValue(userType);
  console.log(userState);

  const getShoppingCartList = async () => {
    if (userState === "SELLER") {
    } else {
      const res = await getCartList(token);
      setCartList(res.results);
      const productId = res.results.map((item) => item.product_id);
      const cartListQuantity = res.results.map((list) => list.quantity);
      setProductIds(productId);
      setCartListCount(cartListQuantity);
    }
  };

  useEffect(() => {
    getShoppingCartList();
  }, [token]);

  return { cartList, getShoppingCartList, productIds, cartListCount };
};

export default useGetCartProducts;
