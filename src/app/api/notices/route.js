import { db } from "../../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function POST(req) {
  console.log(req);
  try {
    const { title, description, writer, date } = await req.json();
    const docRef = await addDoc(collection(db, "notices"), {
      title,
      description,
      writer,
      date,
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

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "notices"), { source: "server" });
    const notices = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify(notices), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error getting documents:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch notices" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
