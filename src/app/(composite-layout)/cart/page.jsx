import { getCartList } from "../../../api/Cart";
import TabTitle from "../../../components/TabTitle/TabTitle";
import CartContents from "../../../components/CartContents/CartContents";

export default function cart() {
  const titles = ["상품정보", "수량", "상품금액"];
  const styles = [{ width: 600 }];

  return (
    <div>
      <h1>Cart</h1>
      <TabTitle showCheckBox={true} titles={titles} style={styles} />
      <CartContents />
    </div>
  );
}
