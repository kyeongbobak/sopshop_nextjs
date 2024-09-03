import styles from "./TabBtnMenu.module.css";

export default function TabBtnMenu({ isBuyer, setIsBuyer, content }) {
  return (
    <ul className={styles.tabMenuBtns}>
      <li className={styles.tabMenuBtnItem}>
        <button className={`${styles.tabBtn} ${isBuyer ? styles.active : ""}`} onClick={() => setIsBuyer(true)}>
          구매회원 {content}
        </button>
      </li>
      <li>
        <button className={`${styles.tabBtn} ${isBuyer ? "" : styles.active}`} onClick={() => setIsBuyer(false)}>
          판매회원 {content}
        </button>
      </li>
    </ul>
  );
}
