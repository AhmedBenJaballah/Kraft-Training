import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from './theme';
import './index.css';
import App from './App.jsx';

function Root() {
  const [mode, setMode] = useState(() => localStorage.getItem('kraft:mode') || 'dark');

  function toggleMode() {
    setMode(m => {
      const next = m === 'dark' ? 'light' : 'dark';
      localStorage.setItem('kraft:mode', next);
      return next;
    });
  }

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App mode={mode} onToggleMode={toggleMode} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
