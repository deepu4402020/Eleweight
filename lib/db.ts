import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
console.log("db.ts receiveed");
if (!MONGODB_URI) {
  throw  Error("MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
console.log("connectDB called ");

  if (cached.conn) {
    console.log("cached.conn exists");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("cahes.promise doesn't exist");
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  if(cached.conn)console.log("cached.conn created");
  return cached.conn;
}