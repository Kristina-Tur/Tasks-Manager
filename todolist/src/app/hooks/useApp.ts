import { useCallback, useState } from "react"
import { createTheme } from "@mui/material/styles"
import { FilterType } from "../../api/API"
import { changeTodolistFilterAC } from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { useAppDispatch } from "../store"
import { loginTC, logoutTC } from "features/login/authSlice"

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
