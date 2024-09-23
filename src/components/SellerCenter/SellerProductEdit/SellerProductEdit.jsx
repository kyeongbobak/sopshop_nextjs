"use client";

import { useEffect, useState } from "react";
import { userToken } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { sellerGetProductList } from "../../../api/Seller";
import Image from "next/image";
import TabTitle from "../../../components/TabTitle/TabTitle";
import styles from "./SellerProductEdit.module.css";

export default function SellerProductEdit() {
  const [sellingProductList, setSellingProductList] = useState([]);
  const titles = ["상품정보", "판매가격", "수정", "삭제"];
  const styling = [{ width: 800 }];

  const token = useRecoilValue(userToken);

  const sellerProductList = async () => {
    const res = await sellerGetProductList(token);
    console.log(res.results);
    setSellingProductList(res.results);
  };

  useEffect(() => {
    sellerProductList();
  }, [token]);

  return (
    <>
      <div className={styles.wrapper}>
        <TabTitle titles={titles} style={styling} />

        {sellingProductList.map((list, index) => (
          <div key={index} className={styles.sellingProductWrapper}>
            <div className={styles.sellingProductInfo}>
              <Image src={list.image} alt="sellingProductImage" width={130} height={130} priority={true} />
              <div className={styles.ProductInfoDetails}>
                <strong>{list.product_name}</strong>
                <p>Qty : {list.stock}</p>
              </div>
            </div>
            <div className={styles.sellingProductPrice}>
              <p>{list.price.toLocaleString()} 원</p>
            </div>
            <div className={styles.sellingProductPrice}>
              <button className={styles.actionBtn}>수정</button>
            </div>
            <div className={styles.sellingProductPrice}>
              <button className={styles.actionBtn}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
