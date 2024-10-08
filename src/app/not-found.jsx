import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Not Found",
};

export default function notFound(props) {
  console.log(props);
  return (
    <>
      <div className={styles.wrapper}>
        <strong className={styles.errorMessage}>페이지를 찾을 수 없습니다.</strong>
        <div className={styles.errorMessageWrapper}>
          <p className={styles.errorTypography}>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.</p>
          <p className={styles.errorTypography}>웹 주소가 올바른지 확인해주세요.</p>
        </div>
        <div>
          <Link className={styles.navigateBtnWrapper} href="/">
            <button className={styles.navigateBtn}>메인으로</button>
          </Link>
        </div>
      </div>
    </>
  );
}
