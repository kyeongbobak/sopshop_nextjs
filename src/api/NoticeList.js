// 공지사항 목록 보기
import { db } from "../lib/firebaseAdmin";

export async function getNotices() {
  const snapshot = await db.collection("notices").get();
  const notices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return notices;
}
