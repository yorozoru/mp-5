"use server";
import getCollection, {ALIAS_LIST} from "@/db";

export default async function findAlias(inputString: string){
    const aliases = await getCollection(ALIAS_LIST);

    const data = await aliases.findOne({alias: inputString})

    // @ts-expect-error remove _id
    delete data?._id;
    return data;
}