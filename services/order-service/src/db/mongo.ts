import mongoose from "mongoose";

const uri = process.env.MONGO_URL || 'changeMe';
console.log(uri);
connect().catch((err) => console.log(err));

export async function connect() {
  await mongoose.connect(uri);
}

export async function disconnect() {
  await mongoose.disconnect();
}
