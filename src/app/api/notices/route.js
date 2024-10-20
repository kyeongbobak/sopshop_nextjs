import { db } from "../../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { title, description, writer, date } = await req.json();
    const docRef = await addDoc(collection(db, "notices"), {
      title,
      description,
      writer,
      date: serverTimestamp(),
    });

    return new Response(JSON.stringify({ id: docRef.id, title, description, writer, date }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to add notice" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
