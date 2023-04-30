import { Button, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { handleIncommingCallNotification, isServiceWorker, registerServiceWorker } from "../utils/handleNotifications";
import { useEffect } from "react";
import { showErrorNotification } from "./NotiService";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { exportData, listenForReload, resetLogs } from "../utils/handleLogs";
import DownloadIcon from '@mui/icons-material/Download';

export function SWhandler() {

    useEffect(() => {
        listenForReload();
        registerServiceWorker();
    }, [])

    return (
        <div style={{ padding: "30px", marginTop: "200px", display: 'flex', flexDirection: 'column', alignContent: "center", alignItems: "center", gap: '20px' }}>
            <Typography sx={{ textOverflow: 'ellipsis' }}>Testing Service Worker and muilti platform push notification</Typography>
            {['Push Notification', 'Download Logs', 'Reset Logs'].map((buttonRenderer) => <Button key={buttonRenderer} variant="contained" endIcon={buttonRenderer === 'Push Notification' ? <SendIcon /> : buttonRenderer === 'Download Logs' ? <DownloadIcon /> : <RestartAltIcon />} onClick={buttonRenderer === 'Push Notification' ? () => { isServiceWorker() ? handleIncommingCallNotification() : showErrorNotification('SW not available') } : () => { buttonRenderer === 'Download Logs' ? exportData() : resetLogs() }}>
                {buttonRenderer}
            </Button>
            )}
        </div>
    )
}