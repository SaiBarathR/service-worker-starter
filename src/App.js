import { useSnackbar } from 'notistack';
import './App.css';
import { SWhandler } from './components/SWhandler';
import { setCloseSnackBarRef, setSnackBarRef } from './components/NotiService';
import { useEffect } from 'react';

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    setSnackBarRef(enqueueSnackbar);
    setCloseSnackBarRef(closeSnackbar);
  }, [enqueueSnackbar, closeSnackbar]);
  return (
    <div className="App">
      <SWhandler />
    </div>
  );
}

export default App;
