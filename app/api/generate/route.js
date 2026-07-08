// app/api/generate/route.js

import getClientPromise from "@/app/lib/Mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, shorturl } = body;

    if (!url || !shorturl) {
      return Response.json(
        { success: false, error: true, message: "Both url and shorturl are required." },
        { status: 400 }
      );
    }

    const client = await getClientPromise();
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const existing = await collection.findOne({ shorturl });
    if (existing) {
      return Response.json(
        { success: false, error: true, message: "This short URL is already in use. Please try another." },
        { status: 409 }
      );
    }

    await collection.insertOne({ url, shorturl });

    return Response.json(
      { success: true, error: false, message: "Your short URL was generated successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in /api/generate:", err);
    return Response.json(
      { success: false, error: true, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}