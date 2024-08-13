import { useCallback, useState } from "react"
import { createTheme } from "@mui/material/styles"
import { useAppDispatch } from "../store"
import { logoutTC } from "features/auth/model/authSlice"

type ThemeMode = "dark" | "light"

export const useApp = () => {
  const dispatch = useAppDispatch()
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#087EA4",
      },
    },
  })

  const changeModeHandler = () => {
    setThemeMode(themeMode == "light" ? "dark" : "light")
  }

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  return {
    theme,
    changeModeHandler,
    logoutHandler,
  }
}
