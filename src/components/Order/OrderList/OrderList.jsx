"use client";

import { userToken } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import useGetCartProducts from "../../../hook/useGetCartProducts";
import useProductInfos from "../../../hook/useProductInfos";
import styles from "./OrderList.module.css";

export default function OrderList() {
  const token = useRecoilValue(userToken);
  console.log(token);

  const { cartItemIds, productIds } = useGetCartProducts(token);
  console.log(cartItemIds);
  const { productInfos } = useProductInfos(token, productIds);

  console.log(productInfos);

  return <div className={styles.wrapper}></div>;
}
