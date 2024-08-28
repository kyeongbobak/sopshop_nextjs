import styles from "./TabBtnMenu.module.css";

export default function TabBtnMenu() {
  return (
    <ul className={styles.tabMenuBtns}>
      <li className={styles.tabMenuBtnsItem}>
        <button className={styles.tabBtn}>구매회원</button>
      </li>
      <li>
        <button className={styles.tabBtn}>판매회원</button>
      </li>
    </ul>
  );
}
