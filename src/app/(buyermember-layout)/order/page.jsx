import TabTitle from "../../../components/TabTitle/TabTitle";
import OrderList from "../../../components/Order/OrderList/OrderList";
import OrderForm from "../../../components/Order/OrderForm/OrderForm";
import styles from "../cart/cart.module.css";

export default function order() {
  const titles = ["상품 정보", "할인", "배송비", "주문금액"];
  const styling = [{ width: 500 }, { width: 180 }, { width: 300 }];

  return (
    <div>
      <h1 className={styles.title}>Order</h1>
      <TabTitle titles={titles} style={styling} />
      <OrderList />
      <OrderForm />
    </div>
  );
}
