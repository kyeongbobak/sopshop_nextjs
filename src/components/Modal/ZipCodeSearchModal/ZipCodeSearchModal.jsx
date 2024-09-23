import DaumPostCode from "react-daum-postcode";
import styles from "./ZipCodeSearchModal.module.css";

export default function ZipCodeSerchModal({ onComplete }) {
  const completeHandler = (data) => {
    onComplete(data);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <DaumPostCode onComplete={completeHandler} />
      </div>
    </>
  );
}
