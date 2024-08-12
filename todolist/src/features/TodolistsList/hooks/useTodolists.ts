import { useAppDispatch, useAppSelector } from "app/store"
import { useCallback, useEffect } from "react"
import {
  addTodolistTC,
  changeTodolistFilter,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  removeTodolistTC,
  selectTodolists,
} from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { FilterType } from "api/API"
import { selectIsLoginIn } from "features/login/authSlice"

export const useTodolists = (demo: boolean) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)
  const isLoggedIn = useAppSelector(selectIsLoginIn)

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
      dispatch(changeTodolistFilter({ todolistId, filter }))
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
