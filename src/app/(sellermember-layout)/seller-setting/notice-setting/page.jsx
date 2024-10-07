import NoticeCreate from "../../../../components/SellerCenter/NoticeCreate/NoticeCreate";
import styles from "./notice-setting.module.css";

export default function noticeSetting() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Notice</h1>
        <NoticeCreate />
      </div>
    </>
  );
}
