import TabTitle from "../../../components/TabTitle/TabTitle";
import CartList from "../../../components/CartList/CartList";

export default async function cart() {
  const titles = ["상품정보", "수량", "상품금액"];
  const styles = [{ width: 600 }];

  return (
    <div>
      <TabTitle showCheckBox={true} titles={titles} style={styles} />
      <CartList />
    </div>
  );
}
