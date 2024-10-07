import { getNotices } from "../../../api/notices/route";

export default async function noticeDetail({ params }) {
  const { "notice-number": noticeIndex } = params;
  const notice = await getNotices();
  const noticeNumber = Number(noticeIndex);
  const selectedNotice = notice.find((_, index) => index === noticeNumber);

  return (
    <>
      <h1>Notice</h1>
      <h2>{selectedNotice.title}</h2>
      <p></p>
    </>
  );
}
