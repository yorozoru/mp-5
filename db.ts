import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_API as string;
if (!MONGO_URI) {
    throw new Error("MONGO_RI env variable not defined")
}