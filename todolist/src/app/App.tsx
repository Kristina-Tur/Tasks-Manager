import React, { useEffect } from "react"
import "./App.css"
import { AppBar, CircularProgress, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import Container from "@mui/material/Container"
import { MenuButton } from "components/MenuButton"
import { ThemeProvider } from "@mui/material/styles"
import Switch from "@mui/material/Switch"
import CssBaseline from "@mui/material/CssBaseline"
import { useApp } from "./hooks/useApp"
import { ErrorSnackbar } from "components/errorSnackbar/ErrorSnackbar"
import { useAppDispatch, useAppSelector } from "./store"
import { initializedAppTC, RequestStatusType } from "app/appSlice"
import { Outlet } from "react-router-dom"

type AppPropsType = {
  demo?: boolean
}

export const App = ({ demo = false }: AppPropsType) => {
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  console.log("App is called")
  const { theme, changeModeHandler, logoutHandler } = useApp()

  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializedAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static" sx={{ mb: "30px" }}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {
              isLoggedIn && (
                <MenuButton color="inherit" onClick={logoutHandler}>
                  Logout
                </MenuButton>
              )
              /*: <MenuButton color="inherit" /!*background={theme.palette.primary.dark}*!/>Login</MenuButton>*/
            }
            <Switch color={"default"} onChange={changeModeHandler} />
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Outlet />
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
