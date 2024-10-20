import { getNotices } from "../../../../api/Notice";
import styles from "./notice-detail.module.css";

export default async function noticeDetail({ params }) {
  const { "notice-number": noticeIndex } = params;
  const notice = await getNotices();

  const noticeNumber = Number(noticeIndex);
  const selectedNotice = notice.find((_, index) => index === noticeNumber);
  const selectedDate = new Date(selectedNotice.date.seconds * 1000).toLocaleString().split(",")[0];
  const [month, day, year] = selectedDate.split(`/`);
  const postedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

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
            <p>{postedDate}</p>
          </div>
          <p className={styles.noticeDescription}>{selectedNotice.description}</p>
        </div>
      </div>
    </>
  );
}
