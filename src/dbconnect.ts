import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://argaenth:09EPg0uVeZ8cGiQX@shadcn.4bwmwc6.mongodb.net/shadcntodo";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached: typeof mongoose | null = null;

export async function connect() {
  if (cached) {
    return cached;
  }

  try {
    cached = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
    return cached;
  } catch (e) {
    cached = null;
    throw e;
  }
}
