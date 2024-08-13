import { combineReducers, UnknownAction } from "redux"
import { todolistsReducer } from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { tasksReducer } from "features/TodolistsList/tasks-reducer/tasksSlice"
import { configureStore, ThunkAction } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "app/appSlice"
import { ThunkDispatch } from "redux-thunk"
import { authReducer } from "features/auth/model/authSlice"

/*type rootReducerType = {
    todolists: TodolistDomainType[]
    tasks: TasksType
}*/

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

/*export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))*/

export const store = configureStore({ reducer: rootReducer })
/*export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});*/

//type AllActionsType = TodolistsActionsType | TasksActionsType | AuthActionsType | AppActionsType

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, /*AllActionsType*/ UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  /*AllActionsType*/ UnknownAction
>
// @ts-ignore
window.store = store
