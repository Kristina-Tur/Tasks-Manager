import React from "react"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { v1 } from "uuid"
import { tasksReducer } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { todolistsReducer } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { AppRootStateType } from "app/store"
import { appReducer } from "app/appSlice"
import { thunk } from "redux-thunk"
import { authReducer } from "features/auth/model/authSlice"
import { HashRouter } from "react-router-dom"
import { TaskPriorities, TaskStatuses } from "common/enums"

/*type RootStateType = {
    tasks: TasksType
    todolists: TodolistDomainType[]
} | undefined*/

const rootReducer /*: Reducer<RootStateType, ActionsType & ActionType>*/ = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "loading" },
  ],
  tasks: {
    ["todolistId1"]: [
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
    ["todolistId2"]: [
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
        title: "React Book",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
        entityStatus: "idle",
      },
    ],
  },
  app: {
    error: null,
    status: "succeeded",
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk))
/*export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})*/

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
export const BrowserRouter = (storyFn: any) => {
  return <HashRouter>{storyFn()}</HashRouter>
}
