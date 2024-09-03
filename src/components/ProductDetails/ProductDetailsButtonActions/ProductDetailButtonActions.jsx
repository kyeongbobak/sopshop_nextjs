import styles from "./ProductDetailButtonActions.module.css";

export default function ProductDetailButtonActions() {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.primaryActionButton}>BuyNow</button>
      <button className={styles.actionBtn}>AddToCart</button>
    </div>
  );
}
