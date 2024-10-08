"use client";

import { useRecoilValue } from "recoil";
import { userToken } from "../../../recoil/atoms";
import useGetOrderList from "../../../hook/useGetOrderList";
import styles from "./OrderDetails.module.css";

export default function OrderDetails() {
  const token = useRecoilValue(userToken);

  const { orderItem } = useGetOrderList(token);

  return (
    <>
      {orderItem.map((item, index) => (
        <div className={styles.wrapper} key={index}>
          <div>
            <h2 className={styles.detailsTitle}>OrderDetails</h2>
            <div className={styles.productPriceWrapper}>
              <p>
                <strong>결제 금액 : </strong>
                <strong>{item.total_price.toLocaleString()}</strong> 원
              </p>
            </div>
            <h3 className={styles.detailsTitle}>Delivery</h3>
            <div className={styles.detailsWrapper}>
              <p>
                <strong>받는 사람 : </strong>
                {item.receiver}
              </p>
              <p>
                <strong>휴대폰 번호 : </strong>
                {item.receiver_phone_number}
              </p>
              <p>
                <strong>주소 : </strong>
                {item.address}
              </p>
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
