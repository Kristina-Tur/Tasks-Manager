import { useAppDispatch, useAppSelector } from "app/store"
import { useCallback, useEffect } from "react"
import { FilterType } from "features/TodolistsList/todolistApi"
import { selectIsLoginIn } from "features/auth/model/authSlice"
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  fetchTodolists,
  removeTodolist,
  selectTodolists,
} from "features/TodolistsList/todolist-reducer/todolistsSlice"

export const useTodolists = (demo: boolean) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)
  const isLoggedIn = useAppSelector(selectIsLoginIn)

  useEffect(() => {
    if (!demo || !isLoggedIn) {
      dispatch(fetchTodolists())
    }
  }, [])

  const addTodolistCallback = useCallback(
    (value: string) => {
      dispatch(addTodolist(value))
    },
    [dispatch],
  )

  const changeTodolist = useCallback(
    (todolistId: string, filter: FilterType) => {
      dispatch(changeTodolistFilter({ todolistId, filter }))
    },
    [dispatch],
  )

  const removeTodolistCallback = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolist(todolistId))
    },
    [dispatch],
  )

  const changeTodolistTitleCallback = useCallback(
    (todolistId: string, title: string) => {
      dispatch(changeTodolistTitle({ todolistId, title }))
    },
    [dispatch],
  )

  return {
    todolists,
    addTodolistCallback,
    changeTodolist,
    removeTodolistCallback,
    changeTodolistTitleCallback,
    isLoggedIn,
  }
}
