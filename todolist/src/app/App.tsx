import React from 'react';
import './App.css';
import {Todolist} from '../features/TodolistsList/todolist/Todolist';
import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import {MenuButton} from "../components/MenuButton";
import {ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {useApp} from "./hooks/useApp";
import {FilterType, TaskType, TodolistType} from "../api/api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


export const App = () => {
    console.log('App is called')
    const {
        theme,
        changeModeHandler
    } = useApp()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <MenuButton color="inherit" background={theme.palette.primary.dark}>Login</MenuButton>
                        <MenuButton color="inherit">Logout</MenuButton>
                        <MenuButton color="inherit">Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <TodolistsList/>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default App;
