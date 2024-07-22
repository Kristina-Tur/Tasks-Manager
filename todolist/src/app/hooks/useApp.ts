import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {useCallback, useEffect, useState} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC
} from "../../state/todolist-reducer/todolists-reducer";
import {createTheme} from "@mui/material/styles";
import {TodolistDomainType} from "../App";
import {api, FilterType} from "../../api/api";

type ThemeMode = 'dark' | 'light'

export const useApp = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistAC(value))
    }, [dispatch])

    const changeTodolist = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
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

    useEffect(() => {
        api.getTodolists().then(res => {
            dispatch(setTodolistsAC(res.data))
        })
    }, [])

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