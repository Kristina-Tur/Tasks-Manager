import * as React from "react"
import { ChangeEvent } from "react"
import ListItem from "@mui/material/ListItem"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { removeTask, updateTask } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { useAppDispatch } from "app/store"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import { TaskStatuses } from "common/enums"
import { TaskDomainType } from "features/TodolistsList/ui/taskApi.types"
import { styled } from "styled-components"

type Props = {
  task: TaskDomainType
}
export const Task = ({ task }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => dispatch(removeTask({ todolistId: task.todoListId, taskId: task.id }))

  const updateTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    return dispatch(updateTask({ todolistId: task.todoListId, taskId: task.id, domainModel: { status } }))
  }

  const updateTaskTitleHandler = (title: string) =>
    dispatch(updateTask({ todolistId: task.todoListId, taskId: task.id, domainModel: { title } }))

  return (
    <ListItem sx={{ p: 0, justifyContent: "space-between" }}>
      <Wrapper>
        <Checkbox
          onChange={updateTaskStatusHandler}
          checked={task.status === TaskStatuses.Completed}
          disabled={task.entityStatus === "loading"}
        />
        <EditableSpan
          title={task.title}
          onChange={updateTaskTitleHandler}
          disabled={task.entityStatus === "loading"}
          status={task.status}
        />
      </Wrapper>
      <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={task.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </ListItem>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  overflow-x: hidden;
  word-wrap: break-word;
`
