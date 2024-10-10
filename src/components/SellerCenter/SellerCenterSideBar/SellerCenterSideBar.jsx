"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./SellerCenterSideBar.module.css";

export default function SellerCenterSideBar() {
  const [selected, setSelected] = useState();
  const [isActive, setIsActive] = useState();
  const pathname = usePathname();

  const actions = ["manage"];

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <ul className={styles.sidebar}>
      <li className={`${styles.sidebarItem} ${selected === "/dashboard" ? styles.active : ""}`}>
        <Link href="/dashboard" onClick={() => setSelected("/dashboard")}>
          판매중인 상품
        </Link>
      </li>
      <li className={`${styles.sidebarItem} ${selected === "/orders" ? styles.active : ""}`}>
        <Link href="/seller-center/orders" onClick={() => setSelected("/orders")}>
          주문 / 배송
        </Link>
      </li>
      <li className={`${styles.sidebarItem} ${selected === "/reviews" ? styles.active : ""}`}>
        <Link href="/seller-center/reviews" onClick={() => setSelected("/reviews")}>
          문의 / 리뷰
        </Link>
      </li>
      <li className={`${styles.sidebarItem} ${selected === "/statistics" ? styles.active : ""}`}>
        <Link href="/seller-center/statistics" onClick={() => setSelected("/statistics")}>
          통계
        </Link>
      </li>
      <li className={`${styles.sidebarItem} ${selected === "/setting" ? styles.active : ""}`}>
        <Link
          href="/seller-center/seller-setting"
          onClick={() => {
            setSelected("/seller-center/seller-setting");
          }}
        >
          스토어 설정
        </Link>
      </li>
      <li className={`${styles.sidebarItem} ${selected === "/setting/notice-setting" ? styles.active : ""}`}>
        <Link
          href={"/setting/notice-setting"}
          onClick={() => {
            setSelected("/setting/notice-setting");
          }}
        >
          공지사항 관리
        </Link>
      </li>
      {actions.map((action, index) => (
        <li
          key={index}
          className={`${styles.sidebarItem} ${selected === `/product-manage/${action}/${index}` ? styles.active : ""} ${selected === `/product-manage/${action}/${index}` || pathname === `/product-manage/modify/${index}` ? styles.active : ""}`}
        >
          <Link href={`/product-manage/${action}/${index}`} onClick={() => setSelected(`/product-manage/${action}/${index}`)}>
            상품 관리
          </Link>
        </li>
      ))}
    </ul>
  );
}
