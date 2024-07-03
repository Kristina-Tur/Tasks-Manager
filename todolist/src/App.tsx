import React, {ChangeEvent, useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './components/todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import Button from "@mui/material/Button";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import {MenuButton} from "./components/MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolist-reducer/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./state/tasks-reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";

export type FilterType = 'all' | 'active' | 'completed'
type ThemeMode = 'dark' | 'light'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    id: string
    isDone: boolean
    title: string
}

export type TasksType = {
    [key: string]: TasksStateType[]
}

const App = () => {
    console.log('App is called')
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists)


    /*const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(addTaskAC(todolistId, value))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])*/

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistAC(value))
    },[dispatch])

    const changeTodolist = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(ChangeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }, [dispatch])

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
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            return (
                                <Grid>
                                    <Paper elevation={3} sx={{p: '0 20px 20px 20px'}}>
                                        <Todolist
                                            key={todolist.id}
                                            todolistId={todolist.id}
                                            title={todolist.title}
                                            changeTodolist={changeTodolist}

                                           /* tasks={tasks[todolist.id]}
                                            removeTask={removeTask}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}*/

                                            filter={todolist.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default App;
