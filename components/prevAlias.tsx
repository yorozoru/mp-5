import { AliasProps } from "@/types";
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function PreviousAliases (prev : AliasProps){

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href + prev.alias);
    };

    return(
        <div className="bg-blue-500">
            <div className="flex flex-row">
                <h4 className="text-white">{window.location.href + prev.alias}</h4>
                <IconButton onClick={copyToClipboard}><ContentCopyIcon/></IconButton>
            </div>
        </div>
    )

}