// app/[url]/page.js

import { redirect } from "next/navigation";
import getClientPromise from "../lib/Mongodb";

export default async function Page({ params }) {
  const { url } = await params;

  try {
    const client = await getClientPromise();
    const db = client.db("bitlinks");
    const collection = db.collection("url");
    const doc = await collection.findOne({ shorturl: url });

    if (doc) {
      redirect(doc.url);
    } else {
      redirect(process.env.NEXT_PUBLIC_HOST);
    }
  } catch (err) {
    // redirect() throws internally by design — don't swallow that
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.error("Error resolving short URL:", err);
    redirect(process.env.NEXT_PUBLIC_HOST);
  }
}