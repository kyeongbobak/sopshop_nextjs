"use client";

import StyledLink from "next/link";
import styles from "./SellerCenterSideBar.module.css";
import { useState } from "react";

export default function SellerCenterSideBar() {
  const [selected, setSelected] = useState("판매중인 상품");

  return (
    <>
      <ul className={styles.sidebar}>
        <li className={`${styles.sidebarItem} ${selected === "판매중인 상품" ? styles.active : ""}`} onClick={() => setSelected("판매중인 상품")}>
          <StyledLink href={"/seller-dashboard"}>판매중인 상품</StyledLink>
        </li>
        <li className={`${styles.sidebarItem} ${selected === "주문 / 배송" ? styles.active : ""}`} onClick={() => setSelected("주문 / 배송")}>
          <StyledLink href={""}>주문 / 배송</StyledLink>
        </li>
        <li className={`${styles.sidebarItem} ${selected === "문의 / 리뷰" ? styles.active : ""}`} onClick={() => setSelected("문의 / 리뷰")}>
          <StyledLink href={""}>문의 / 리뷰</StyledLink>
        </li>
        <li className={`${styles.sidebarItem} ${selected === "통계" ? styles.active : ""}`} onClick={() => setSelected("통계")}>
          <StyledLink href={""}>통계</StyledLink>
        </li>
        <li className={`${styles.sidebarItem} ${selected === "스토어 설정" ? styles.active : ""}`} onClick={() => setSelected("스토어 설정")}>
          <StyledLink href={""}>스토어 설정</StyledLink>
        </li>
        <li className={`${styles.sidebarItem} ${selected === "상품 등록" ? styles.active : ""}`} onClick={() => setSelected("상품 등록")}>
          <StyledLink href={""}>상품 등록</StyledLink>
        </li>
      </ul>
    </>
  );
}
