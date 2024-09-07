import { useEffect, useState } from "react";
import { getCartList } from "../api/Cart";

const useGetCartProducts = (token) => {
  const [cartList, setCartList] = useState([]);
  console.log(token);

  const getShoppingCartList = async () => {
    const res = await getCartList(token);
    setCartList(res.results);
  };

  useEffect(() => {
    getShoppingCartList();
  }, [token]);

  return { cartList };
};

export default useGetCartProducts;
