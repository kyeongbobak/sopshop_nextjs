import styles from "./ProductDetailButtonActions.module.css";

export default function ProductDetailButtonActions() {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.buyBtn}>BuyNow</button>
      <button className={styles.addToCartBtn}>AddToCart</button>
    </div>
  );
}
