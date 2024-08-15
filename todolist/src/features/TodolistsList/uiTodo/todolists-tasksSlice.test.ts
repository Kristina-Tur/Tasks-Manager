import { addTodolist, todolistsReducer } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { tasksReducer, TasksType } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { TodolistDomainType } from "features/TodolistsList/services/todolistApi"
import { Action } from "common/types/types"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action: Action<typeof addTodolist.fulfilled> = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: "1",
        title: "new todolist",
        addedDate: "",
        order: 0,
      },
    },
  }

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
