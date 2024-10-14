export async function getNotices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`, {
    cache: "no-store",
  });

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  if (!res.ok) {
    console.log("error");
  }
  return await res.json();
}
