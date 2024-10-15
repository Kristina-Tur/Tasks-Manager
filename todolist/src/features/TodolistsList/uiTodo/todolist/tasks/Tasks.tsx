import { Task } from "features/TodolistsList/uiTodo/todolist/tasks/task/Task"
import React from "react"
import { useAppSelector } from "app/store"
import { TaskDomainType } from "features/TodolistsList/ui/taskApi.types"
import { selectFilteredTasks } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import List from "@mui/material/List"
import { styled } from "styled-components"
import { FilterType } from "features/TodolistsList/ui/todolistApi.types"

type Props = {
  filter: FilterType
  todolistId: string
}
export const Tasks = ({ filter, todolistId }: Props) => {
  let tasks = useAppSelector<TaskDomainType[]>((state) => selectFilteredTasks(state, filter, todolistId))
  return (
    <>
      {tasks.length === 0 ? (
        <Paragraph>No tasks</Paragraph>
      ) : (
        <List sx={{ height: "226px", overflow: "auto" }}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </List>
      )}
    </>
  )
}

const Paragraph = styled.p`
  height: 226px;
  overflow: auto;
  margin: 0;
  padding: 20px 5px;
`
