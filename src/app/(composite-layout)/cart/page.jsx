import TabTitle from "../../../components/TabTitle/TabTitle";
import CartContents from "../../../components/CartContents/CartContents";
import styles from "./cart.module.css";

export default function cart() {
  const titles = ["상품정보", "수량", "상품금액"];
  const styling = [{ width: 600 }];

  return (
    <div>
      <h1 className={styles.title}>Cart</h1>
      <TabTitle showCheckBox={true} titles={titles} style={styling} />
      <CartContents />
    </div>
  );
}
