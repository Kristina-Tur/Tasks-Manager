import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ActionsType, todolistsReducer} from "../features/todolist-reducer/todolists-reducer";
import {ActionType, tasksReducer} from "../features/tasks-reducer/tasks-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {Action} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";

/*type rootReducerType = {
    todolists: TodolistDomainType[]
    tasks: TasksType
}*/

const rootReducer: any = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

/*export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});*/

export type AppRootStateType = ReturnType<typeof rootReducer>

export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, Action>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
// @ts-ignore
window.store = store