import getCollection, {ALIAS_LIST} from "@/db";

export default async function findAlias(inputString: string){
    const aliases = await getCollection(ALIAS_LIST);

    const data = await aliases.findOne({alias: inputString})

    if (data === null){
        return false
    }
    else{
        return true
    }

}