import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {useCallback, useState} from "react";
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC
} from "../../state/todolist-reducer/todolists-reducer";
import {createTheme} from "@mui/material/styles";
import {TodolistDomainType} from "../App";
import {FilterType} from "../../api/api";

type ThemeMode = 'dark' | 'light'

export const useApp = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)

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