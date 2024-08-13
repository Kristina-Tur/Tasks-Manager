import { v1 } from "uuid"
import { TodolistDomainType } from "features/TodolistsList/todolistApi"
import {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  fetchTodolists,
  removeTodolist,
  todolistsReducer,
} from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { removeTask } from "features/TodolistsList/tasks-reducer/tasksSlice"

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "loading" },
  ]
})

test("correct todolist should be removed", () => {
  type Action = Omit<ReturnType<typeof removeTodolist.fulfilled>, "meta">
  const action: Action = {
    type: removeTodolist.fulfilled.type,
    payload: {
      todolistId: todolistId1,
    },
  }
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  type Action = Omit<ReturnType<typeof addTodolist.fulfilled>, "meta">
  const action: Action = {
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
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe("new todolist")
  expect(endState[0].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  type Action = Omit<ReturnType<typeof changeTodolistTitle.fulfilled>, "meta">
  const action: Action = {
    type: changeTodolistTitle.fulfilled.type,
    payload: {
      todolistId: todolistId2,
      title: "New Todolist",
    },
  }
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})

test("correct filter of todolist should be changed", () => {
  const endState = todolistsReducer(startState, changeTodolistFilter({ todolistId: todolistId2, filter: "completed" }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})
test("correct status of todolist should be changed", () => {
  const endState = todolistsReducer(
    startState,
    changeTodolistEntityStatus({ todolistId: todolistId2, status: "loading" }),
  )

  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe("loading")
})

test("todolists should be set to the state", () => {
  type Action = Omit<ReturnType<typeof fetchTodolists.fulfilled>, "meta">
  const action: Action = {
    type: fetchTodolists.fulfilled.type,
    payload: {
      todolists: startState,
    },
  }
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(2)
})
