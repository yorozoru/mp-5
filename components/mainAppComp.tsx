"use client";

import { Button, TextField} from '@mui/material';
import findAlias from '@/lib/findAlias';
import { useState } from 'react';

export default function NewAlias() {

    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");

    const [usedAlias, setUsedAlias] = useState(false);
    const [validUrl, setValidUrl] = useState(true);

    async function aliasChecker(a:string){
        const foundAlias = await findAlias(a);
        if (foundAlias){
            setUsedAlias(true);
        } else {
            setUsedAlias(false);
            setAlias(a);
        }
    }
    function validUrlWrapper(b:string){
        function isValidUrl(){
            try {
                new URL(b);
                return true;
            } catch (err){
                return false;
            }
        }
        const outcome = isValidUrl();   
        if (outcome){
            setUrl(b);
        } else {
            setValidUrl(false);
        }
    }

    return (
        <form>
            <TextField
                variant='filled'
                label='Alias'
                value={alias}
                onChange={(e)=>aliasChecker(e.target.value)}
            />
            <TextField
                variant='filled'
                label='URL'
                value={url}
                onChange={(e)=>validUrlWrapper(e.target.value)}
            />
            <Button
            variant="contained"
            type="submit"
            disabled={alias.length === 0 || url.length === 0 }
            >Create</Button>
        </form>
    )
}