import { useEffect, useState } from "react";
import { orderList } from "../api/Order";

const useGetOrderList = (token) => {
  const [orderItems, setOrderItems] = useState([]);
  const [productIds, setProductIds] = useState([]);

  const getOrderList = async () => {
    const res = await orderList(token);
    setOrderItems(res.results.slice(0, 1));
    const orderProducts = res.results.map((i) => i.order_items);
    setProductIds(orderProducts);
    console.log(res.results);
  };

  useEffect(() => {
    getOrderList();
  }, [token]);

  return { orderItems, productIds };
};

export default useGetOrderList;
