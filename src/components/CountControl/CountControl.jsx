"use client";
import { useState } from "react";
import Image from "next/image";
import minusIcon from "../../../public/img/icon-minus-line.png";
import plusIcon from "../../../public/img/icon-plus-line.png";
import styles from "./CountControl.module.css";

export default function CountControl({ stock, price }) {
  console.log(stock);
  console.log(price);
  const [count, setCount] = useState(1);

  const handleOnCount = (increment) => {
    const newCount = count + increment;
    if (newCount < 1) {
      setCount(1);
    } else if (newCount > stock) {
      alert(`이 제품의 최대 구매 가능한 수량은 ${stock}개 입니다.`);
      setCount(stock);
    } else {
      setCount(newCount);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.countControlInner}>
        <button className={styles.countControlBtn} onClick={() => handleOnCount(-1)}>
          <Image src={minusIcon} alt="minus-icon" />
        </button>
        <p className={styles.count}>{count}</p>
        <button className={styles.countControlBtn} onClick={() => handleOnCount(+1)}>
          <Image src={plusIcon} alt="plus-icon" />
        </button>
      </div>
      <div className={styles.totalProductPriceWrapper}>
        <p>총 상품 금액</p>
        <div className={styles.totalProductPriceInner}>
          <p className={styles.totalProductCount}>
            총 수량 <span>{count}</span>개
          </p>
          <p className={styles.totalProductPriceCal}>
            <span>{price * count}</span>원
          </p>
        </div>
      </div>
    </div>
  );
}
