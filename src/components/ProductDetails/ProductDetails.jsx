"use client";
import { useState } from "react";
import Image from "next/image";
import minusIcon from "../../../public/img/icon-minus-line.png";
import plusIcon from "../../../public/img/icon-plus-line.png";
import styles from "./ProductDetails.module.css";

function CountControl({ stock, count, setCount }) {
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
    <div className={styles.countControlWrapper}>
      <button className={styles.countControlBtn} onClick={() => handleOnCount(-1)}>
        <Image src={minusIcon} alt="minus-icon" />
      </button>
      <p className={styles.count}>{count}</p>
      <button className={styles.countControlBtn} onClick={() => handleOnCount(+1)}>
        <Image src={plusIcon} alt="plus-icon" />
      </button>
    </div>
  );
}

function TotalProductPrice({ count, price }) {
  return (
    <div className={styles.totalProductPriceWrapper}>
      <p>총 상품 금액</p>
      <div className={styles.totalProductPriceInner}>
        <p>
          총 수량 <strong>{count}</strong> 개
        </p>
        <p className={styles.totalProductPriceCal}>
          <strong>{(price * count).toLocaleString()}</strong> 원
        </p>
      </div>
    </div>
  );
}

function ProductDetails({ stock, price }) {
  const [count, setCount] = useState(1);
  console.log(stock);
  console.log(price);
  return (
    <div className={styles.ProductDetailsWrapper}>
      <CountControl stock={stock} count={count} setCount={setCount} />
      <TotalProductPrice price={price} count={count} />
    </div>
  );
}

export default ProductDetails;
