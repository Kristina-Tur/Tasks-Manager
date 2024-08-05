import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, ThunkDispatchType, useAppDispatch} from "../../../app/store";
import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    getTodolistsTC,
    removeTodolistTC,
} from "../todolist-reducer/todolists-reducer";
import {FilterType, TodolistDomainType} from "../../../api/API";
import {Navigate} from "react-router-dom";

export const useTodolists = (demo: boolean) => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if(!demo || !isLoggedIn){
            dispatch(getTodolistsTC())
        }
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
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])


    return {
        todolists,
        addTodolist,
        changeTodolist,
        removeTodolist,
        changeTodolistTitle,
        isLoggedIn
    }
}