import clientPromise from "@/app/lib/Mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const doc = await collection.findOne({ shorturl: body.shorturl })
  if (doc) {
    
  return Response.json({ success: false, error: true, message: "This url is already in used. Please gererate another URL" });
    
  }
  const result = await collection.insertOne({
    url: body.url,
    shorturl: body.shorturl,
  });

  return Response.json({ success: true, error: false, message: "Your short-url generate successfully!!!!!!!" });
}
