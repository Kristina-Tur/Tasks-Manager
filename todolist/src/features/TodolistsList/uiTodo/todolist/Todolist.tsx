import React, { useCallback, useEffect } from "react"
import "app/App.css"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import Box from "@mui/material/Box"
import { useAppDispatch } from "app/store"
import { addTask, fetchTasks } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { TodolistDomainType } from "features/TodolistsList/ui/todolistApi.types"
import { styled } from "styled-components"
import { FilterTasksButtons } from "features/TodolistsList/uiTodo/todolist/FilterTasksButtons"
import { Tasks } from "features/TodolistsList/uiTodo/todolist/tasks/Tasks"
import { TodolistTitle } from "features/TodolistsList/uiTodo/todolist/TodolistTitle"

type Props = {
  todolist: TodolistDomainType
  demo?: boolean
}

export const Todolist = React.memo(({ todolist, demo = false }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTasks(todolist.id))
    }
  }, [])

  const addItem = (title: string) => {
    return dispatch(addTask({ todolistId: todolist.id, title }))
  }

  return (
    <WrapperTodolist>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addItem} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolistId={todolist.id} filter={todolist.filter} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FilterTasksButtons todolist={todolist} />
      </Box>
    </WrapperTodolist>
  )
})

const WrapperTodolist = styled.div`
  width: 300px;
`
