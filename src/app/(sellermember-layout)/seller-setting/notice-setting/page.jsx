import Notice from "../../../../components/SellerCenter/Notice/Notice";
import styles from "./notice-setting.module.css";

export default function noticeSetting() {
  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Notice</h1>
        <Notice />
      </div>
    </>
  );
}
