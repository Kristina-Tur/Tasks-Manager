import { combineReducers, UnknownAction } from "redux"
import { todolistsReducer } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { tasksReducer } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { configureStore, ThunkAction } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "app/appSlice"
import { ThunkDispatch } from "redux-thunk"
import { authReducer } from "features/auth/model/authSlice"

/*type rootReducerType = {
    todolists: TodolistDomainType[]
    tasks: TasksType
}*/

/*const rootReducer = combineReducers()*/

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

/*export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  /!*AllActionsType*!/ UnknownAction
>*/
// @ts-ignore
window.store = store
/*export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});*/
/*export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))*/
