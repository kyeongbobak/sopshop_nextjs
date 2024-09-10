"use client";
import { useSetRecoilState } from "recoil";
import { cartItemCount } from "../../recoil/atoms";
import Image from "next/image";
import minusIcon from "../../../public/img/icon-minus-line.png";
import plusIcon from "../../../public/img/icon-plus-line.png";
import styles from "./CountControl.module.css";

export default function CountControl({ stock, count, setCount, onCountChange }) {
  const setCartItemCount = useSetRecoilState(cartItemCount);

  const handleOnCount = (increment) => {
    const newCount = count + increment;
    if (newCount < 1) {
      setCount(1);
    } else if (newCount > stock) {
      alert(`이 제품의 최대 구매 가능한 수량은 ${stock}개 입니다.`);
      setCount(stock);
    } else {
      setCount(newCount);
      setCartItemCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <div className={styles.countControlWrapper}>
      <button className={styles.countControlBtn} onClick={() => handleOnCount(-1)}>
        <Image src={minusIcon} alt="minus-icon" priority />
      </button>
      <p className={styles.count}>{count}</p>
      <button className={styles.countControlBtn} onClick={() => handleOnCount(+1)}>
        <Image src={plusIcon} alt="plus-icon" priority />
      </button>
    </div>
  );
}
