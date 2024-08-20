"use client";

import { useState } from "react";
import styles from "./ProductDetailsTabs.module.css";

export default function ProductDetailsTabs() {
  const [isClicked, setIsClicked] = useState("Review");
  const [isClickedContents, setIsClickedContents] = useState("Review");

  return (
    <div>
      <ul className={styles.detailTabsWrapper}>
        <li className={styles.detailTabsItem}>
          <button
            className={`${styles.tabsItemBtn} ${isClicked === "Review" ? styles.active : ""}`}
            onClick={() => {
              setIsClicked("Review");
              setIsClickedContents("Review");
            }}
          >
            Review
          </button>
        </li>
        <li className={styles.detailTabsItem}>
          <button
            className={`${styles.tabsItemBtn} ${isClicked === "Q&A" ? styles.active : ""}`}
            onClick={() => {
              setIsClicked("Q&A");
              setIsClickedContents("Q&A");
            }}
          >
            Q&A
          </button>
        </li>
        <li className={styles.detailTabsItem}>
          <button
            className={`${styles.tabsItemBtn} ${isClicked === "Returns / Refund" ? styles.active : ""}`}
            onClick={() => {
              setIsClicked("Returns / Refund");
              setIsClickedContents("Returns / Refund");
            }}
          >
            Returns / Refund
          </button>
        </li>
      </ul>
      <div className={styles.TabsItemContents}>{isClickedContents}</div>
    </div>
  );
}
