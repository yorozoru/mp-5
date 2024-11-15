"use server";
import getCollection, {ALIAS_LIST} from "@/db";

export default async function createNewAlias(newAlias : string, newURL : string) {

    const entry = {
        alias: newAlias,
        url: newURL,
    };

    const aliases = await getCollection(ALIAS_LIST);
    const res = await aliases.insertOne(entry);

    if (!res.acknowledged){
        return null
    }
    return entry
    
}