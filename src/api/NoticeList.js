export async function getNotices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("error");
  }
  return await res.json();
}
