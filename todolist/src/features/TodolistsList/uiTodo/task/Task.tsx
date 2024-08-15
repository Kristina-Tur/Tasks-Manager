// @flow
import * as React from "react"
import { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "features/TodolistsList/uiTodo/todolist/Todolist.styles"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { removeTask, updateTask } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { TaskType, TodolistDomainType } from "features/TodolistsList/services/todolistApi"
import { useAppDispatch } from "app/store"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import { TaskStatuses } from "common/enums"

type TaskComponentType = {
  task: TaskType
  todolist: TodolistDomainType
}
export const Task = ({ task, todolist }: TaskComponentType) => {
  const dispatch = useAppDispatch()

  const onRemoveHandler = () => dispatch(removeTask({ todolistId: todolist.id, taskId: task.id }))

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    return dispatch(updateTask({ todolistId: todolist.id, taskId: task.id, domainModel: { status } }))
  }

  const onChangeEditableSpanHandler = (title: string) =>
    dispatch(updateTask({ todolistId: todolist.id, taskId: task.id, domainModel: { title } }))

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatuses.Completed)}>
      <div>
        <Checkbox onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed} />
        <EditableSpan
          title={task.title}
          onChange={onChangeEditableSpanHandler}
          disabled={todolist.entityStatus === "loading"}
        />
      </div>
      <IconButton aria-label="delete" onClick={onRemoveHandler}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}
