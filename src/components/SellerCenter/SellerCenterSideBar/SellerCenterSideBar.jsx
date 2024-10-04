"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./SellerCenterSideBar.module.css";

export default function SellerCenterSideBar() {
  const [selected, setSelected] = useState();
  const pathname = usePathname();

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  // 이부분 노션 정리
  return (
    <ul className={styles.sidebar}>
      <li className={`${styles.sidebarItem} ${selected === "/seller-dashboard" ? styles.active : ""}`}>
        <Link href="/seller-dashboard" onClick={() => setSelected("/seller-dashboard")}>
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
      <li className={`${styles.sidebarItem} ${selected === "/seller-setting" ? styles.active : ""}`}>
        <Link
          href="/seller-center/seller-setting"
          onClick={() => {
            setSelected("/seller-center/seller-setting");
          }}
        >
          스토어 설정
        </Link>
      </li>
      <li className={`${styles.sidebarItem} ${selected === "/seller-setting/notice-setting" ? styles.active : ""}`}>
        <Link
          href={"/seller-setting/notice-setting"}
          onClick={() => {
            setSelected("/seller-setting/notice-setting");
          }}
        >
          공지사항 관리
        </Link>
      </li>

      <li className={`${styles.sidebarItem} ${selected === "/seller-create" ? styles.active : ""}`}>
        <Link href="/seller-create" onClick={() => setSelected("/seller-create")}>
          상품 등록
        </Link>
      </li>
    </ul>
  );
}
