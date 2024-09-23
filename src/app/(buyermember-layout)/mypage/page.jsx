import MyPageContents from "../../../components/MyPageContents/MyPageContents";
import TabTitle from "../../../components/TabTitle/TabTitle";
import styles from "./my.module.css";

export default function myPage() {
  const titles = ["상품정보", "주문금액", "결제방법", "주문처리 상태"];
  const styling = [{ width: 600 }];

  return (
    <>
      <h1 className={styles.title}>My Page</h1>
      <TabTitle titles={titles} style={styling} />
      <MyPageContents />
    </>
  );
}
