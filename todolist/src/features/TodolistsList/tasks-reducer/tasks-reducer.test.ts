import { v1 } from "uuid"
import { TaskPriorities, TaskStatuses } from "features/TodolistsList/todolistApi"
import { addTodolist, removeTodolist, setTodolists } from "features/TodolistsList/todolist-reducer/todolistsSlice"
import {
  addTask,
  fetchTasks,
  removeTask,
  tasksReducer,
  TasksType,
  updateTask,
} from "features/TodolistsList/tasks-reducer/tasksSlice"
import { Action } from "common/types/types"

let startState: TasksType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: v1(),
        title: "HTML&CSS",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "JS",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "React",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "ll",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "ts",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "styledComponent",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: "Milk",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "Bread",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "Tea",
        description: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
      {
        id: v1(),
        title: "Coffee",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
    ],
  }
})

test("correct task should be removed", () => {
  const endState = tasksReducer(
    startState,
    removeTask({ todolistId: "todolistId1", taskId: startState["todolistId1"][0].id }),
  )

  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(4)
})

test("correct task should be add", () => {
  type Action = Omit<ReturnType<typeof addTask.fulfilled>, "meta">
  const action: Action = {
    type: addTask.fulfilled.type,
    payload: {
      task: {
        id: "sss",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
        deadline: "",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        title: "MUI",
        description: "",
      },
    },
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(7)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId1"][0].title).toBe("MUI")
  expect(endState["todolistId1"][0].status).toBe(TaskStatuses.New)
  expect(endState["todolistId1"][0].id).toBeDefined()
})

test("correct task should change its name", () => {
  const action: Action<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: startState["todolistId2"][0].id,
      domainModel: { title: "Apple" },
    },
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(6)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].title).toBe("Apple")
  expect(endState["todolistId1"][0].title).toBe("HTML&CSS")
})

test("correct change status of task should be changed", () => {
  const action: Action<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: {
      todolistId: "todolistId2",
      taskId: startState["todolistId2"][3].id,
      domainModel: { status: TaskStatuses.New },
    },
  }
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(6)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][3].status).toBe(TaskStatuses.New)
  expect(endState["todolistId1"][3].status).toBe(TaskStatuses.New)
})

test("new array should be added when new todolist is added", () => {
  const action = addTodolist({
    todolist: {
      id: "1",
      title: "new todolist",
      addedDate: "",
      order: 0,
    },
  })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action = removeTodolist({ todolistId: "todolistId2" })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("empty arrays should be added when we set todolists", () => {
  const action = setTodolists({
    todolists: [
      { id: "todolistId1", title: "Hello", order: 0, addedDate: "" },
      { id: "todolistId2", title: "Bye", order: 0, addedDate: "" },
    ],
  })

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["todolistId1"]).toStrictEqual([])
  expect(endState["todolistId2"]).toStrictEqual([])
})

test("tasks should be added for todolist", () => {
  const action: Action<typeof fetchTasks.fulfilled> = {
    type: fetchTasks.fulfilled.type,
    payload: {
      tasks: startState["todolistId1"],
      todolistId: "todolistId1",
    },
  }

  /*const _action = fetchTasks.fulfilled(
    //первый параметр: что санка возвращает, 2: requestId, 3: аргументы самой санки
    { todolistId: "todolistId1", tasks: startState["todolistId1"] },
    "requestId",
    "todolistId1",
  )*/

  const endState = tasksReducer(
    {
      todolistId1: [],
      todolistId2: [],
    },
    action,
  )

  expect(endState["todolistId1"].length).toBe(6)
  expect(endState["todolistId2"].length).toBe(0)
})
