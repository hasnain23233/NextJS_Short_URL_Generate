// lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

function getClientPromise() {
  if (!uri) {
    throw new Error(
      "Add MONGODB_URI to your environment variables (.env.local locally, or Vercel Project Settings → Environment Variables)."
    );
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export default getClientPromise;