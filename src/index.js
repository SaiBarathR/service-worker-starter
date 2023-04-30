import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import { Fade } from '@mui/material';
import { saveLogs } from './utils/handleLogs';

const root = ReactDOM.createRoot(document.getElementById('root'));
saveLogs();
root.render(
  <SnackbarProvider maxSnack={3} TransitionComponent={Fade} anchorOrigin={{ vertical: 'top', horizontal: "center" }}>
    <App />
  </SnackbarProvider>
);

reportWebVitals();
