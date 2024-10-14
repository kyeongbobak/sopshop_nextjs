// 공지사항 목록 보기
export async function getNotices() {
  const res = await fetch(`${process.env.API_URL}/api/notices`, {
    cache: "no-store",
  });

  console.log("API URL:", process.env.API_URL);

  if (!res.ok) {
    console.log("error");
  }
  return await res.json();
}
