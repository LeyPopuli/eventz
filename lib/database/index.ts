import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose || {conn: null, promise: null};

export const connectToDB = async () => {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: "arcanevents",
        bufferCommands: false,
    });

    cached.conn = await cached.promise;

    return cached.conn
}