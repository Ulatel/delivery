import React from "react";
import theme from "../../theme";
import deepMerge from 'deepmerge';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ({ children }) {
    const prefersDarkMode = window.SuperGlobal.darkMode[0] || !useMediaQuery('(prefers-color-scheme: dark)');
    const themeApp = React.useMemo(() => createTheme(deepMerge({
        palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            
            text: {
                primary: window.SuperGlobal.darkMode[0] ? '#eee' : '#000',
            },
        },
    }, theme(prefersDarkMode))), [prefersDarkMode]);
    
    return <>
        <ThemeProvider theme={(theme) => deepMerge(theme, themeApp)}>
            {children}
        </ThemeProvider>
    </>;
}