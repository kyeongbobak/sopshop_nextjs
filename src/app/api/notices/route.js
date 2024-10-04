import fs from "fs";
import path from "path";

export async function POST(req) {
  const filePath = path.join(process.cwd(), "notices.json");
  const newNotice = await req.json();

  let notices = [];
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    notices = JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading file:", error);
  }

  notices.push(newNotice);

  fs.writeFileSync(filePath, JSON.stringify(notices, null, 2), "utf-8");

  return new Response(JSON.stringify(newNotice), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getNotices() {
  const filePath = path.join(process.cwd(), "notices.json");

  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");

    const notices = JSON.parse(jsonData);
    return notices;
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}
