"use client";

import { userToken } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import useGetCartProducts from "../../hook/useGetCartProducts";
import styles from "./CartList.module.css";

export default function CartList() {
  const token = useRecoilValue(userToken);
  const { cartList } = useGetCartProducts(token);
  console.log(cartList);

  return (
    <div className={styles.wrapper}>
      {cartList.map((list, index) => (
        <div key={index}>
          <input type="checkbox" />
          <p>{list.product_id}</p>
        </div>
      ))}
    </div>
  );
}
