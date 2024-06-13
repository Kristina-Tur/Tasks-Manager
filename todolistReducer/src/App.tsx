import React, {ChangeEvent, useReducer, useState} from 'react';
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
import {todolistsReducer} from "./state/todolist-reducer/todolists-reducer";
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolist-reducer/todolists-reducer";
import {AddInNewTodolistTasksAC, taskReducer} from "./state/task-reducer/task-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    refreshTasksAC,
    removeTaskAC
} from "./state/task-reducer/task-reducer";

export type FilterType = 'all' | 'active' | 'completed'
type ThemeMode = 'dark' | 'light'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

export type TasksType = {
    [key: string]: TasksPropsType[]
}

const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    /*const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])*/

    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    /*const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ],
    })*/
    const [tasks, dispatchTasks] = useReducer(taskReducer, {
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ],
    })

    const removeTask = (todolistId: string, id: string) => {
        /*setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})*/
        dispatchTasks(removeTaskAC(todolistId, id))
    }

    const addTask = (todolistId: string, value: string) => {
        const newTask = {id: v1(), isDone: false, title: value}
        /*setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})*/
        dispatchTasks(addTaskAC(todolistId, value))
    }

    const AddTodolist = (value: string) => {
        const todolistId = v1()
       /* setTodolists([newTodolist, ...todolists])*/
        /*setTasks({[newTodolist.id]: [], ...tasks})*/
        dispatchTodolists(addTodolistAC(value, todolistId))
        dispatchTasks(AddInNewTodolistTasksAC(todolistId))
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        /*setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })*/
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        /*setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)
        })*/
        dispatchTasks(changeTaskTitleAC(todolistId, taskId, title))
    }

    const changeTodolist = (todolistId: string, filter: FilterType) => {
        /*setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: filter} : todolist))*/
        dispatchTodolists(ChangeTodolistFilterAC(todolistId, filter))
    }

    const removeTodolist = (todolistId: string) => {
        /*setTodolists(todolists.filter(todolist => todolist.id !== todolistId))*/
        /*delete tasks[todolistId]*/
        /*setTasks({...tasks})*/
        dispatchTasks(refreshTasksAC(todolistId))
        dispatchTodolists(removeTodolistAC(todolistId))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        /*setTodolists(todolists.map(todolist => todolistId === todolist.id ? {...todolist, title} : todolist))*/
        dispatchTodolists(ChangeTodolistTitleAC(todolistId, title))
    }

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
                        <AddItemForm addItem={AddTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            let tasksForTodolist = tasks[todolist.id]
                            return (
                                <Grid>
                                    <Paper elevation={3} sx={{p: '0 20px 20px 20px'}}>
                                        <Todolist
                                            key={todolist.id}
                                            todolistId={todolist.id}
                                            title={todolist.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeTodolist={changeTodolist}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
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
