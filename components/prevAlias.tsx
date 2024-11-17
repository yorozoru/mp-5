import { AliasProps } from "@/types";
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function PreviousAliases(prev : AliasProps){
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href + prev.alias);
    };

    return(
        <div className="w-4/5 p-3 m-3 bg-blue-500 rounded-md">
            <div className="flex flex-row items-center">
                <div className="text-center"> 
                    <h4 className="text-white text-lg">{window.location.href + prev.alias}</h4>
                </div>
                <IconButton onClick={copyToClipboard}><ContentCopyIcon sx={{color:"white"}}/></IconButton>
            </div>
        </div>
    )
}