import MyOrderList from "../../../components/Order/MyOrderList/MyOrderList";
import styles from "./order-complete.module.css";

export default function orderComplete() {
  return (
    <>
      <h1 className={styles.title}>Order Result</h1>
      <p className={styles.contents}>주문 완료 되었습니다!</p>
      <MyOrderList />
    </>
  );
}
