"use client";
import { Button, TextField } from '@mui/material';
import findAlias from '@/lib/findAlias';
import { SetStateAction, useState } from 'react';
import createNewAlias from '@/lib/createNewAlias';
import { isUrlReachable } from '@/lib/urlValidator';
import { AliasProps } from '@/types';
import PreviousAliases from './prevAlias';

export default function NewAlias() {

    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");

    const [usedAlias, setUsedAlias] = useState(false);
    const [validUrl, setValidUrl] = useState(true);

    const [prevAlias, setPrevAlias] = useState<AliasProps[]>([]);

    async function aliasChecker() {
        const foundAlias = await findAlias(alias);
        if (foundAlias === null) {
            setUsedAlias(false);
        } else {
            setUsedAlias(true);
        }
    }

    async function submitNewAlias (){
        const isValid = await isUrlReachable(url);
        setValidUrl(isValid);
        if (isValid){
            const a = await createNewAlias(alias, url);
            if (a===null){
                return false
            }
            setPrevAlias([a, ...prevAlias]);
            setValidUrl(false);
            setUrl("");
            setAlias("");
        }

    }
    
    function clearChange (value: SetStateAction<string>){
        setValidUrl(true);
        setUrl(value);
    }
    return (
        <div>
        <form
        onSubmit={(e) => {e.preventDefault(); submitNewAlias()}}
        >
            <TextField
                variant='filled'
                sx={{ backgroundColor: "white", width: "100%" }}
                label='Alias'
                value={alias}
                onBlur={() => aliasChecker()}
                onChange={(e) => setAlias(e.target.value)}
                error={usedAlias}
                helperText={usedAlias ? "Alias already in use" : ""}
            />
            <TextField
                variant='filled'
                sx={{ backgroundColor: "white", width: "100%" }}
                label='URL'
                value={url}
                onChange={(e) => clearChange(e.target.value)}
                error={!validUrl}
                helperText={!validUrl ? "Invalid URL" : ""}
            />
            <div className='justify-content'>
                <Button
                    variant="contained"
                    sx={{ width: "80px", color: "orange", backgroundColor: "white" }}
                    type="submit"
                    disabled={alias.length === 0 || url.length === 0 || usedAlias || !validUrl}
                >Create</Button>
            </div>
        </form>
        {prevAlias.map((obj) => (
        <PreviousAliases key={obj.alias} {...obj} />
        ))}
        
        </div>
    )
}