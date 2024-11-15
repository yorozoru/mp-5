import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_API as string;
if (!MONGO_URI) {
    throw new Error("MONGO_URI env variable not defined")
}

const DB_NAME = "alias-link-list";
export const ALIAS_LIST = "alias-collection";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI)
        await client.connect();
    }
    return client.db(DB_NAME);
}

export default async function getCollection(
    collectionName: string,
): Promise<Collection>{
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName)
}