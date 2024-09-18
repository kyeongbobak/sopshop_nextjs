"use client";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userToken } from "../../../recoil/atoms";
import { orderList } from "../../../api/Order";
import Image from "next/image";
import useProductInfos from "../../../hook/useProductInfos";
import styles from "./MyOrderList.module.css";

export default function MyOrderList() {
  const [orderItems, setOrderItems] = useState([]);
  const [productIds, setProductIds] = useState([]);

  const token = useRecoilValue(userToken);

  console.log(orderItems);

  const getOrderList = async () => {
    const res = await orderList(token);
    setOrderItems(res.results.slice(0, 1));
    const orderProducts = res.results.map((i) => i.order_items);
    setProductIds(orderProducts);
    console.log(res.results);
  };

  const { productInfos } = useProductInfos(token, productIds);
  console.log(productInfos);

  useEffect(() => {
    getOrderList();
  }, [token]);

  return (
    <>
      {orderItems.map((item, index) => (
        <div className={styles.wrapper} key={index}>
          {productInfos[index] && <Image className={styles.productImage} src={productInfos[index].image} width={400} height={480} alt="productImage" priority={true} />}
          <div>
            <h2 className={styles.detailsTitle}>OrderDetails</h2>
            {productInfos[index] && (
              <>
                <div className={styles.detailsWrapper}>
                  <p>
                    <strong>브랜드명 : </strong>
                    {productInfos[index].store_name}
                  </p>
                  <p>
                    <strong>상품명 : </strong>
                    {productInfos[index].product_name}
                  </p>
                  <p>
                    <strong>Qty : </strong>
                    {item.order_quantity}
                  </p>
                </div>
              </>
            )}
            <div className={styles.productPriceWrapper}>
              <p>
                <strong>상품 금액 : </strong>
                <strong>{item.total_price.toLocaleString()}</strong> 원
              </p>
            </div>
            <h3 className={styles.detailsTitle}>Delivery</h3>
            <div className={styles.detailsWrapper}>
              <p>{item.receiver}</p>
              <p>{item.receiver_phone_number}</p>
              <p>{item.address}</p>
            </div>
            <div className={styles.deliveryDetailsWrapper}>
              <p>
                <strong>배송상태 : </strong>
                {item.delivery_status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
