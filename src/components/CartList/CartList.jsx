"use client";

import { userToken } from "../../recoil/atoms";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import useGetCartProducts from "../../hook/useGetCartProducts";
import useProductInfos from "../../hook/useProductInfos";
import CountControl from "../CountControl/CountControl";
import styles from "./CartList.module.css";

export default function CartList() {
  const [count, setCount] = useState(1);
  const token = useRecoilValue(userToken);
  const { cartList } = useGetCartProducts(token);
  const productsInTheCart = useMemo(() => cartList.map((v) => v.product_id), [cartList]);
  const { productInfos } = useProductInfos(token, productsInTheCart);

  return (
    <div className={styles.wrapper}>
      {productInfos.map((product, index) => (
        <div className={styles.cartListWrapper} key={index}>
          <input type="checkbox" />
          <p>{product.store_name}</p>
          <p>{product.product_name}</p>
          <p>{product.price}</p>
          <p>{product.shipping_method === "PARCEL" ? "택배배송" : "무료배송"}</p>
          <CountControl stock={product.stock} count={count} setCount={setCount} />
          <p>{(product.price * count).toLocaleString()} 원</p>
        </div>
      ))}
    </div>
  );
}
