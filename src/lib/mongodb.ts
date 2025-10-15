// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mf_explorer";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

/**
 * Next.js hot reload can create multiple connections.
 * Use global cache to avoid reconnecting.
 */
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any)._mongo || { conn: null, promise: null };

if (!cached.promise) {
  const opts = {
    bufferCommands: false,
    // useNewUrlParser, useUnifiedTopology are default in latest mongoose
  };
  cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  (global as any)._mongo = cached;
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  cached.conn = await cached.promise;
  return cached.conn;
}
