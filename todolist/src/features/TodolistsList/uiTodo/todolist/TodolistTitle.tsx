// @flow
import * as React from "react"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { styled } from "styled-components"
import { TodolistDomainType } from "features/TodolistsList/ui/todolistApi.types"
import { changeTodolistTitle, removeTodolist } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { useAppDispatch } from "app/store"

type Props = {
  todolist: TodolistDomainType
}
export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitle({ todolistId: todolist.id, title }))
  }
  const removeTodolistHandler = () => {
    const todolistId = todolist.id
    dispatch(removeTodolist(todolistId))
  }

  return (
    <WrapperTitle>
      <h3>
        <EditableSpan
          title={todolist.title}
          onChange={(title) => changeTodolistTitleHandler(title)}
          disabled={todolist.entityStatus === "loading"}
        />
      </h3>
      <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </WrapperTitle>
  )
}

const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
`
