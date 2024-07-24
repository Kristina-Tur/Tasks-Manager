import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, ThunkDispatchType} from "../../state/store";
import {useCallback, useEffect, useState} from "react";
import {
    addTodolistAC, addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, getTodolistsTC,
    removeTodolistAC, removeTodolistTC, setTodolistsAC, updateTodolistTitleTC
} from "../../state/todolist-reducer/todolists-reducer";
import {createTheme} from "@mui/material/styles";
import {TodolistDomainType} from "../App";
import {api, FilterType} from "../../api/api";

type ThemeMode = 'dark' | 'light'

export const useApp = () => {
    const dispatch = useDispatch<ThunkDispatchType>()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistTC(value))
    }, [dispatch])

    const changeTodolist = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
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

    return {
        todolists,
        theme,
        changeModeHandler,
        addTodolist,
        changeTodolist,
        removeTodolist,
        changeTodolistTitle
    }
}