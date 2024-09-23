"use client";

import { userToken } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import useGetOrderList from "../../hook/useGetOrderList";
import useProductInfos from "../../hook/useProductInfos";
import Image from "next/image";
import styles from "./MyPageContents.module.css";
import { order } from "../../api/Order";

export default function MyPageContents() {
  const token = useRecoilValue(userToken);

  const { orderItems, productIds } = useGetOrderList(token);
  const { productInfos } = useProductInfos(token, productIds);

  return (
    <>
      <div className={styles.wrapper}>
        {orderItems.map((item, index) => (
          <div className={styles.contentsWrapper} key={index}>
            {productInfos[index] && (
              <>
                <div className={styles.productInfoWrapper}>
                  <Image className={styles.productImage} src={productInfos[index].image} width={150} height={170} alt="productImage" priority={true} />
                  <div className={styles.productInfoDetailsWrapper}>
                    <strong>{productInfos[index].store_name}</strong>
                    <p>{productInfos[index].product_name}</p>
                    <p>Qty : {item.order_quantity}</p>
                  </div>
                </div>
              </>
            )}
            <div className={styles.orderInfoWrapper}>
              <p>
                <strong>{item.total_price.toLocaleString()}</strong> 원
              </p>
            </div>
            <div className={styles.orderInfoWrapper}>
              <p>{item.payment_method}</p>
            </div>
            <div className={styles.orderInfoWrapper}>
              <p className={styles.orderInfoDescription}>{item.delivery_status}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
