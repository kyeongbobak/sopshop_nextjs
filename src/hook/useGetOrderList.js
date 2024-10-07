import { useEffect, useState } from "react";
import { orderList } from "../api/Order";

const useGetOrderList = (token) => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [productId, setProductId] = useState([]);

  const getOrderList = async () => {
    const res = await orderList(token);
    setOrderItems(res.results);
    setOrderItem(res.results.slice(0, 1));
    const orderProducts = res.results.map((i) => i.order_items).flat();
    setProductIds(orderProducts);
    setProductId(orderProducts.slice(0, 1));
  };

  useEffect(() => {
    getOrderList();
  }, [token]);
  console.log(productIds);
  return { orderItems, productIds, orderItem, productId };
};

export default useGetOrderList;
