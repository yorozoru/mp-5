"use client";
import { Button, TextField } from '@mui/material';
import findAlias from '@/lib/findAlias';
import { useState } from 'react';

export default function NewAlias() {

    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");

    const [usedAlias, setUsedAlias] = useState(false);
    const [validUrl, setValidUrl] = useState(true);

    async function aliasChecker() {
        const foundAlias = await findAlias(alias);
        if (foundAlias) {
            setUsedAlias(true);
        } else {
            setUsedAlias(false);
        }
    }

    function validUrlWrapper(b: string) {
        async function isValidUrl() {
            try {
                new URL(b);
                const response = await fetch(b, { method: 'GET' });
                return response.ok;
            } catch (err) {
                return false;
            }
        }
        isValidUrl().then(outcome => setValidUrl(outcome));
    }

    return (
        <form>
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
                onChange={(e) => setUrl(e.target.value)}
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
    )
}