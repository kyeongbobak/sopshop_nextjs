import { getNotices } from "../../../api/notices/route";
import styles from "./notice-detail.module.css";

export default async function noticeDetail({ params }) {
  const { "notice-number": noticeIndex } = params;
  const notice = await getNotices();
  const noticeNumber = Number(noticeIndex);
  const selectedNotice = notice.find((_, index) => index === noticeNumber);

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Notice</h1>
        <h2 className={styles.subTitle}>{selectedNotice.title}</h2>
        <div className={styles.noticeWrapper}>
          <div className={styles.noticeInfo}>
            <strong>Name</strong>
            <p>{selectedNotice.writer}</p>
            <strong>Date</strong>
            <p>{selectedNotice.date}</p>
          </div>
          <p className={styles.noticeDescription}>{selectedNotice.description}</p>
        </div>
      </div>
    </>
  );
}
