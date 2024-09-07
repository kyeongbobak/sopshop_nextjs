"use client";

import styles from "./TabTitle.module.css";

export default function TabTitle({ showCheckBox, titles, style }) {
  return (
    <div className={styles.wrapper}>
      {showCheckBox && <input className={styles.checkBox} type="checkbox" />}
      {titles.map((title, index) => (
        <p className={styles.title} key={index} style={style[index] || []}>
          {title}
        </p>
      ))}
    </div>
  );
}
