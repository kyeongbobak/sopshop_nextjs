import MyPageContents from "../../../components/MyPageContents/MyPageContents";
import TabTitle from "../../../components/TabTitle/TabTitle";

export default function myPage() {
  const titles = ["상품정보", "수량", "주문금액", "결제방법", "주문처리 상태"];
  const styles = [{ width: 600 }];

  return (
    <>
      <TabTitle titles={titles} style={styles} />
      <MyPageContents />
    </>
  );
}
