import mongoose from "mongoose";

const { MONGO_USER, MONGO_PASSWORD, MONGO_DB, MONGO_HOST } = process.env;
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;

connect().catch((err) => console.log(err));

export async function connect() {
  await mongoose.connect(uri);
}
