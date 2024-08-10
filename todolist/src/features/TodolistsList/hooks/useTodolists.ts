import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType, AppDispatchType, useAppDispatch, useAppSelector } from "../../../app/store"
import React, { useCallback, useEffect } from "react"
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  removeTodolistTC,
} from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { FilterType, TodolistDomainType } from "../../../api/API"
import { Navigate } from "react-router-dom"

export const useTodolists = (demo: boolean) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector<TodolistDomainType[]>((state) => state.todolists)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)

  useEffect(() => {
    if (!demo || !isLoggedIn) {
      dispatch(fetchTodolistsTC())
    }
  }, [])

  const addTodolist = useCallback(
    (value: string) => {
      dispatch(addTodolistTC(value))
    },
    [dispatch],
  )

  const changeTodolist = useCallback(
    (todolistId: string, filter: FilterType) => {
      dispatch(changeTodolistFilterAC(todolistId, filter))
    },
    [dispatch],
  )

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
    },
    [dispatch],
  )

  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitleTC(todolistId, title))
    },
    [dispatch],
  )

  return {
    todolists,
    addTodolist,
    changeTodolist,
    removeTodolist,
    changeTodolistTitle,
    isLoggedIn,
  }
}
