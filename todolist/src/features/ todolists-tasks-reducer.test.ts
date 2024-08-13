import { addTodolist, todolistsReducer } from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { tasksReducer, TasksType } from "features/TodolistsList/tasks-reducer/tasksSlice"
import { TodolistDomainType, TodolistType } from "features/TodolistsList/todolistApi"

test("ids should be equals", () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolist({
    todolist: {
      id: "1",
      title: "new todolist",
      addedDate: "",
      order: 0,
    },
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
