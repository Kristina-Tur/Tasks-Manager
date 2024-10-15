import { ButtonWithMemo } from "common/components/buttons/Button"
import React, { useCallback } from "react"
import { FilterType, TodolistDomainType } from "features/TodolistsList/ui/todolistApi.types"
import { v1 } from "uuid"
import { changeTodolistFilter } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { useAppDispatch } from "app/store"

type Props = {
  todolist: TodolistDomainType
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const buttons: Array<{ id: string; title: string; filter: FilterType }> = [
    { id: v1(), title: "All", filter: "all" },
    { id: v1(), title: "Active", filter: "active" },
    { id: v1(), title: "Completed", filter: "completed" },
  ]

  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (filter: FilterType) => {
    dispatch(changeTodolistFilter({ todolistId: todolist.id, filter }))
  }

  return (
    <>
      {buttons.map((button) => (
        <ButtonWithMemo
          key={button.id}
          color={"primary"}
          className={button.filter === todolist.filter ? "active-filter" : ""}
          variant={button.filter === todolist.filter ? "contained" : "outlined"}
          onClick={() => changeTodolistFilterHandler(button.filter)}
          title={button.title}
        />
      ))}
    </>
  )
}
