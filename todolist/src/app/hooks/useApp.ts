import {useState} from "react";
import {createTheme} from "@mui/material/styles";

type ThemeMode = 'dark' | 'light'

export const useApp = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    return {
        theme,
        changeModeHandler,
    }
}